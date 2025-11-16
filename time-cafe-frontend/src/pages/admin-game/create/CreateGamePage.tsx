import { CreateBoardGameForm } from "@/features/createBoardGameForm";
import { FormSection } from "@/widgets/FormSection/FormSection";

export const CreateGamePage = () => {
  return (
    <>
      <FormSection title="Создать новую игру" form={<CreateBoardGameForm />} />
    </>
  );
}