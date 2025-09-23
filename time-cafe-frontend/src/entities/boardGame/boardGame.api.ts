import { $api } from "@/shared/api"
import { BoardGameDto, CreateBoardGameDto, UpdateBoardGameDto } from "./boardGame.dto"

const endPoint = "board-games"

/**
 * Creates a new board game.
 * @param {CreateBoardGameDto} data - The board game data to create
 * @returns {Promise<AxiosResponse<BoardGameDto>>} - A promise that resolves to an AxiosResponse with the created board game
 */
export const createBoardGame = (data: CreateBoardGameDto) => {
  return $api<BoardGameDto, CreateBoardGameDto>({
    endPoint,
    method: "POST",
    data
  })
}

/**
 * Retrieves all board games.
 * @returns {$api<BoardGameDto[]>} A promise that resolves with an array of board games.
 */
export const getAllBoardGames = () => {
  return $api<BoardGameDto[]>({
    endPoint,
    method: "GET"
  })
}

/**
 * Retrieves a board game with the given id.
 * @param {number} id The id of the board game to retrieve.
 * @returns {$api<BoardGameDto>} A promise that resolves with a board game.
 */
export const getBoardGame = (id: number) => {
  return $api<BoardGameDto>({
    endPoint,
    id,
    method: "GET"
  })
}

/**
 * Updates a board game with the given id.
 * @param {number} id The id of the board game to update.
 * @param {UpdateBoardGameDto} data The board game data to update with.
 * @returns {Promise<AxiosResponse<BoardGameDto>>} A promise that resolves to an AxiosResponse with the updated board game.
 */
export const updateBoardGame = (id: number, data: UpdateBoardGameDto) => {
  return $api<BoardGameDto, UpdateBoardGameDto>({
    endPoint,
    id,
    method: "PUT",
    data
  })
}

/**
 * Deletes a board game with the given id.
 * @param {number} id The id of the board game to delete.
 * @returns {Promise<void>} A promise that resolves when the board game is deleted.
 */
export const deleteBoardGame = (id: number) => {
  return $api<void>({
    endPoint,
    id,
    method: "DELETE"
  })
}