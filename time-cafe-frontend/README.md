# Особенности структуры и интеграция FSD и NextJS app routing

## 📂 Папка `app`-> Является точкой входа, в ней лежат маршруты.  
  - App routing обязывает создавать маршруты внутри папки `app`, и называть их `page.tsx`, например для маршрута `/`.  
  - Папка `app` будет иметь в себе маршруты, а фактическая реализация страницы будет лежать в папке `pages`.  
  - Таким образом получится изолировать маршруты от фактической реализации и избежать захламления папки `app`.

  **Нейминг:**
  - **Файлы:** всегда `page.tsx`  
  - **Функции:** `PascalCase + Route` → `LandingRoute()`  
  - **Пример:** `app/landing/page.tsx -> LandingRoute()`

## 📂 Папка `pages`-> Фактическая реализация страниц.  

  **Нейминг:**
  - **Файлы:** `PascalCase + Page.tsx` → `LandingPage.tsx`, `LoginPage.tsx`  
  - **Функции:** совпадает с именем файла, `PascalCase`  
  - **Примеры:** `pages/landing/LandingPage.tsx -> LandingPage()`, `pages/LoginPage.tsx -> LoginPage()`

## 📂 Папка `widgets` — Составные UI компоненты.

  **Нейминг:**
  - **Файлы и компоненты:** `PascalCase` → `Header.tsx`, `Sidebar.tsx`  
  - **Стили:** `.module.css` → `Header.module.css`  
  - **Пример:** `widgets/Header/Header.tsx || Header.module.css`

## 📂 Папка `features` — Блоки
  **Нейминг:**
  - **Файлы UI:** `PascalCase` → `LoginForm.tsx`, `NotificationList.tsx`  
  - **Пример:** ` features/auth/ui/LoginForm.tsx -> LoginForm()`, `features/auth/model/authSlice.ts`  

## 📂 Папка `entities` — доменные объекты
  **Нейминг:**
  - **Модели / типы:** `PascalCase` → `User.ts`, `Product.ts`  
  - **API:** `camel.case` → `user.api.ts`  
  - **Файлы state / model:** `camelCase` → `authSlice.ts`  
  - **Утилиты:** `camelCase` → `userUtils.ts`  
  - **Пример:** `entities/user/model.ts || api.ts || utils.ts`

## 📂 Папка `shared` — переиспользуемые утилиты и UI
  **Нейминг:**
  - **UI компоненты:** `PascalCase` → `Button.tsx`, `Modal.tsx`  
  - **Утилиты:** `camelCase` → `fetcher.ts`, `debounce.ts`  
  - **Пример:** `shared/ui/Button.tsx || Input.tsx`

# 🎨 Принципы БЭМ
  ### **Блок (Block)** -> Самостоятельный компонент с собственной логикой и стилями.  
  **Название файла** -> `НазваниеUIБлока.module.scss -> LoginForm.module.scss`
  **Использовать миксины и переменные** -> `в scss @use '../../shared/styles/variables' as * @use '../../shared/styles/mixins' as *;`

  ### **Блок (Block)** -> Основная часть.
  **Обозначение:** `BlockPascalCase.`
  **Пример:**
  .Header {
    @include flexCenter;
    @include cardInfoBase;
    padding: $value-9 $value-28;
    background-color: #080A23;
  }

  ### **Элемент (Element)** -> Составная часть блока, не существует без блока.
    **Обозначение:** `block__element.`
    **Пример:**
      .Header__logo {
        width: 120px;
      }
      .Header__nav {
        display: flex;
      }

  ### **Модификатор (Modifier)** -> Вариант блока или элемента (цвет, состояние, размер).
    **Обозначение**: `block--modifier или block__element--modifier.`
    **Пример:**
      .Button--primary {
        background-color: #344AEB;
      }
      .Button--disabled {
        opacity: 0.5;
      }
      .Header__nav--mobile {
        display: none;
      }

