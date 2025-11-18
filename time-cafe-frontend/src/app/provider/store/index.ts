import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/entities/auth/auth.slice';
import { boardGamesApi } from "@/entities/boardGame/boardGame.api"
import { bookingsApi } from "@/entities/booking/booking.api";
import { clientApi } from "@/entities/client/client.api";
import { foodItemApi } from "@/entities/foodItem/foodItem.api";
import { roomLayoutItemsApi } from "@/entities/roomLayoutItem/roomLayoutItem.api";
import { rootsApi } from "@/entities/root/root.api";
import { roomsApi } from "@/entities/room/room.api";
import { staffApi } from "@/entities/staff/staff.api";
import { tablesApi } from "@/entities/table/table.api";
import { transactionsApi } from "@/entities/transaction/transaction.api";
import { usersApi } from "@/entities/user/user.api";
import { meApi } from "@/entities/me/me.api";
import { registrationLinksApi } from "@/entities/registrationLinks/registrationLinks.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [boardGamesApi.reducerPath]: boardGamesApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [foodItemApi.reducerPath]: foodItemApi.reducer,
    [roomLayoutItemsApi.reducerPath]: roomLayoutItemsApi.reducer,
    [rootsApi.reducerPath]: rootsApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [meApi.reducerPath]: meApi.reducer,
    [registrationLinksApi.reducerPath]: registrationLinksApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardGamesApi.middleware)
      .concat(bookingsApi.middleware)
      .concat(clientApi.middleware)
      .concat(foodItemApi.middleware)
      .concat(roomLayoutItemsApi.middleware)
      .concat(rootsApi.middleware)
      .concat(roomsApi.middleware)
      .concat(staffApi.middleware)
      .concat(tablesApi.middleware)
      .concat(transactionsApi.middleware)
      .concat(usersApi.middleware)
      .concat(meApi.middleware)
      .concat(registrationLinksApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
