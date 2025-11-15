import { Input } from "@/shared/ui/Inputs"

export const createRoomForm = () => {
  return (
    <form>
      <Input label="Название комнаты" />
      <Input label="Тип комнаты" />
      <Input label="Описание" as="textarea" />
      <Input label="smoking_allowed" as="select">
        <option value="true">Разрешено</option>
        <option value="false">Запрещено</option>
      </Input>
      <Input label="Минимальная цена стола в комнате" />
      <Input value="" label="Тип комнаты" />
    </form>
  )
}