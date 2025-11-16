import { FormSection } from "@/widgets/FormSection/FormSection";
import { CreateFoodItemForm } from "@/features/createFoodItemForm";

export const CreateMenuPage = () => {
  return (
    <FormSection title="Создать новую игру" form={<CreateFoodItemForm />} />
  );
};
