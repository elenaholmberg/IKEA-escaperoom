/*
 * ============================================
 * MAIN.TS — SPELETS HJÄRNA — ÄNDRA INTE UTAN ATT PRATA MED GRUPPEN
 * ============================================
 * Den här filen kopplar ihop ALLT: login, rum, timers, progress, highscore.
 *
 * Det enda ni kan behöva ändra här är om ni lägger till fler rum
 * eller vill ändra spellogiken — men prata med gruppen först!
 */

/* ============================================
 * Imports — hämtar alla moduler vi byggt
 * ============================================ */
import "./styles/main.scss";

import type { RoomData, RoomModule, RoomResult, PlayerProgress } from "./types";
import { showScreen, getElement } from "./utils/dom";
import { createTimer, formatTime } from "./utils/timer";
import { setupLogin } from "./components/login";
import { updateProgressBar } from "./components/progressBar";
import { renderHighscores } from "./components/highscore";
import {
  saveProgress,
  loadProgress,
  clearProgress,
  addHighscore,
} from "./utils/storage";

import room1 from "./rooms/room1";
import room2 from "./rooms/room2";
import room3 from "./rooms/room3";
import room4 from "./rooms/room4";

import roomsData from "./data/rooms.json";

/* ============================================
 * Koppla rum-ID till rätt modul
 * ============================================ */
const roomModules: Record<number, RoomModule> = {
  1: room1,
  2: room2,
  3: room3,
  4: room4,
};

/* ============================================
 * Spelets state — håller koll på allt under spelets gång
 * ============================================ */
let progress: PlayerProgress = {
  playerName: "",
  currentRoom: 1,
  completedRooms: [],
  roomTimes: {},
  totalTime: 0,
};

/* ============================================
 * Timers
 * Total-timern räknar hela spelets tid
 * Rum-timern räknar tid per rum
 * ============================================ */
const totalTimer = createTimer((seconds) => {
  progress.totalTime = seconds;
  const el = document.getElementById("totalTimer");
  if (el) el.textContent = `Total tid: ${formatTime(seconds)}`;
});

const roomTimer = createTimer((seconds) => {
  const el = document.getElementById("roomTimer");
  if (el) el.textContent = `Tid: ${formatTime(seconds)}`;
});

/* ============================================
 * init() — Körs när sidan laddas
 * Kollar om det finns sparad progress, annars visa login
 * ============================================ */
function init(): void {
  const saved = loadProgress();
  if (saved) {
    progress = saved;
    totalTimer.setTime(progress.totalTime);
    showStartScreen();
    return;
  }

  setupLogin((name: string) => {
    progress.playerName = name;
    showStartScreen();
  });
}

/* ============================================
 * showStartScreen() — Hubben
 * Visar rum, progress och timer efter inloggning
 * ============================================ */
function showStartScreen(): void {
  showScreen("startScreen");

  const welcome = getElement("#welcomeMessage");
  welcome.textContent = `Välkommen, ${progress.playerName}!`;

  updateProgressBar(progress.completedRooms.length, roomsData.length);
  totalTimer.start();

  renderRoomsList();
  setupNavigation();
}

/* ============================================
 * renderRoomsList() — Bygger rumkorten i hubben
 * Varje rum får status: "Nästa", "Klart" eller "Låst"
 * ============================================ */
function renderRoomsList(): void {
  const container = getElement("#roomsList");
  container.innerHTML = (roomsData as RoomData[])
    .map((room) => {
      const isCompleted = progress.completedRooms.includes(room.id);
      const isCurrent = room.id === getNextRoom();
      const isLocked = room.id > getNextRoom();

      let statusClass = "locked";
      let statusText = "Låst";
      if (isCompleted) {
        statusClass = "completed";
        statusText = `Klart (${formatTime(progress.roomTimes[room.id] || 0)})`;
      } else if (isCurrent) {
        statusClass = "current";
        statusText = "Nästa";
      }

      return `
        <button
          class="room-card ${statusClass}"
          data-room-id="${room.id}"
          ${isLocked ? "disabled" : ""}
          type="button"
        >
          <h3>${room.name}</h3>
          <p>${room.description}</p>
          <span class="room-status">${statusText}</span>
        </button>
      `;
    })
    .join("");

  container
    .querySelectorAll<HTMLButtonElement>(".room-card")
    .forEach((card) => {
      card.addEventListener("click", () => {
        const roomId = Number(card.dataset.roomId);
        if (!card.disabled) {
          enterRoom(roomId);
        }
      });
    });
}

/* ============================================
 * enterRoom() — Gå in i ett rum
 * Visar rummets namn/beskrivning och visar rätt rum-div
 * ============================================ */
function enterRoom(roomId: number): void {
  const roomData = (roomsData as RoomData[]).find((r) => r.id === roomId);
  const roomModule = roomModules[roomId];
  if (!roomData || !roomModule) return;

  showScreen("roomScreen");

  getElement("#roomName").textContent = roomData.name;
  getElement("#roomDescription").textContent = roomData.description;

  document.querySelectorAll<HTMLElement>(".room-content").forEach((el) => {
    el.hidden = true;
  });

  const roomContent = document.getElementById(`room${roomId}Content`);
  if (roomContent) {
    roomContent.hidden = false;
  }

  roomTimer.reset();
  roomTimer.start();

  roomModule.setup((result: RoomResult) => {
    roomTimer.stop();
    result.timeSpent = roomTimer.getTime();
    completeRoom(result);
  });
}

/* ============================================
 * completeRoom() — När ett rum är klart
 * Sparar progress och kollar om alla rum är klara
 * ============================================ */
function completeRoom(result: RoomResult): void {
  const roomModule = roomModules[result.roomId];
  if (roomModule) roomModule.cleanup();

  const roomContent = document.getElementById(`room${result.roomId}Content`);
  if (roomContent) {
    roomContent.hidden = true;
  }

  if (result.success) {
    if (!progress.completedRooms.includes(result.roomId)) {
      progress.completedRooms.push(result.roomId);
    }
    progress.roomTimes[result.roomId] = result.timeSpent;
    progress.currentRoom = result.roomId + 1;
    saveProgress(progress);

    if (progress.completedRooms.length >= roomsData.length) {
      totalTimer.stop();
      showGameOver(true);
    } else {
      showStartScreen();
    }
  } else {
    totalTimer.stop();
    showGameOver(false);
  }
}

/* ============================================
 * showGameOver() — Game Over-skärmen
 * Visar vinst eller förlust och sparar highscore vid vinst
 * ============================================ */
function showGameOver(success: boolean): void {
  showScreen("gameoverScreen");

  const title = getElement("#gameoverTitle");
  const message = getElement("#gameoverMessage");
  const time = getElement("#gameoverTime");

  if (success) {
    title.textContent = "Grattis! Du tog dig ut ur IKEA!";
    message.textContent =
      "Du lyckades ta dig igenom alla avdelningar och ut genom kassan!";
    time.textContent = `Din totala tid: ${formatTime(progress.totalTime)}`;

    addHighscore({
      name: progress.playerName,
      totalTime: progress.totalTime,
      date: new Date().toLocaleDateString("sv-SE"),
    });
  } else {
    title.textContent = "Game Over!";
    message.textContent =
      "IKEA stängde innan du hann ut. Bättre lycka nästa gång!";
    time.textContent = "";
  }
}

/* ============================================
 * setupNavigation() — Kopplar alla knappar
 * Om-sidan, highscore, tillbaka, spela igen
 * ============================================ */
function setupNavigation(): void {
  const btnAbout = document.getElementById("btnAbout");
  const btnHighscore = document.getElementById("btnHighscore");
  const btnBackFromAbout = document.getElementById("btnBackFromAbout");
  const btnBackFromHighscore = document.getElementById("btnBackFromHighscore");
  const btnBackToHub = document.getElementById("btnBackToHub");
  const btnPlayAgain = document.getElementById("btnPlayAgain");

  btnAbout?.addEventListener("click", () => showScreen("aboutScreen"));

  btnHighscore?.addEventListener("click", () => {
    renderHighscores();
    showScreen("highscoreScreen");
  });

  btnBackFromAbout?.addEventListener("click", () => showScreen("startScreen"));
  btnBackFromHighscore?.addEventListener("click", () =>
    showScreen("startScreen"),
  );

  btnBackToHub?.addEventListener("click", () => {
    roomTimer.stop();
    document.querySelectorAll<HTMLElement>(".room-content").forEach((el) => {
      el.hidden = true;
    });
    const currentRoomId = getNextRoom();
    const roomModule = roomModules[currentRoomId];
    if (roomModule) roomModule.cleanup();
    showStartScreen();
  });

  btnPlayAgain?.addEventListener("click", () => {
    clearProgress();
    progress = {
      playerName: progress.playerName,
      currentRoom: 1,
      completedRooms: [],
      roomTimes: {},
      totalTime: 0,
    };
    totalTimer.reset();
    showStartScreen();
  });
}

/* ============================================
 * getNextRoom() — Hittar nästa oklarat rum
 * ============================================ */
function getNextRoom(): number {
  for (const room of roomsData as RoomData[]) {
    if (!progress.completedRooms.includes(room.id)) {
      return room.id;
    }
  }
  return roomsData.length + 1;
}

/* ============================================
 * Starta spelet!
 * ============================================ */
init();
