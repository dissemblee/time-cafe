import { FormSection } from "@/widgets/FormSection/FormSection";
import { CreateRoomForm } from "@/features/createRoomForm";

export const CreateRoomPage = () => {
  return (
    <FormSection title="Создать новую комнату" form={<CreateRoomForm />} />
  );
};
