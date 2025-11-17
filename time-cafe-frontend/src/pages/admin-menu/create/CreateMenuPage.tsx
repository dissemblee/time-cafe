import { FormSection } from "@/widgets/FormSection/FormSection";
import { CreateFoodItemForm } from "@/features/foodManagement";

export const CreateMenuPage = () => {
  return (
    <FormSection title="Создать новое блюдо" form={<CreateFoodItemForm />} />
  );
};