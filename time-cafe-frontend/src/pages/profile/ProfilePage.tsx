import { UserBookings } from "@/features/bookings";
import { ProfileForm } from "@/features/profileForm";

export const ProfilePage = () => {
  return (
    <>
      <ProfileForm />
      <UserBookings />
    </>
  );
};
