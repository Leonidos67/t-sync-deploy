# Настройка Polar Flow интеграции

## Обзор

Интеграция с Polar Flow позволяет пользователям T-Sync подключать свои аккаунты Polar для синхронизации тренировок, получения данных о тренировочной нагрузке и статусе восстановления.

## Возможности интеграции

- 🔐 **OAuth 2.0 авторизация** через Polar Flow
- 📊 **Синхронизация тренировок** с детальной информацией
- ❤️ **Данные о пульсе** (средний, максимальный)
- 🏃 **Метрики тренировок** (дистанция, время, калории)
- 📈 **Тренировочная нагрузка** и время восстановления
- 📁 **Загрузка TCX файлов** для детального анализа

## Архитектура

### Frontend компоненты
- `ConnectedAccountsSimple` - основной компонент интеграции
- `PolarAuthResult` - обработка результата авторизации
- `polar-service.ts` - сервис для работы с Polar API

### Backend (планируется)
- OAuth 2.0 обработка
- Хранение токенов
- Синхронизация данных

## Настройка для разработки

### 1. Конфигурация Polar API

Для получения реальных API ключей:
1. Зарегистрируйтесь на [Polar Developer Portal](https://www.polar.com/accesslink/)
2. Создайте новое приложение
3. Получите `client_id` и `client_secret`
4. Настройте redirect URI: `http://localhost:5173/auth/polar/callback`

### 2. Обновление конфигурации

В файле `client/src/lib/integrations/polar-service.ts` замените демо-конфигурацию:

```typescript
const POLAR_CONFIG = {
  baseUrl: 'https://www.polar.com/accesslink/3',
  authUrl: 'https://flow.polar.com/oauth2/authorization',
  tokenUrl: 'https://www.polar.com/accesslink/3/oauth/token',
  scope: ['read', 'read_activities', 'read_profile'],
  clientId: '87d902b9-ACCH-4579-a636-a9e342ae090b',
  clientSecret: '326c0ac7-332c-4a8a-8174-d47ad6538d2c',
  redirectUri: 'http://localhost:5173/auth/polar/callback'
};
```

### 3. Переменные окружения

Создайте `.env` файл в корне client:

```env
VITE_POLAR_CLIENT_ID=ваш_client_id
VITE_POLAR_CLIENT_SECRET=ваш_client_secret
VITE_POLAR_REDIRECT_URI=http://localhost:5173/auth/polar/callback
```

## Использование

### Подключение аккаунта

1. Пользователь переходит в "Мои данные" → "Подключенные аккаунты"
2. Нажимает "Подключить аккаунт" для Polar Flow
3. Открывается окно авторизации Polar
4. После успешной авторизации окно закрывается автоматически
5. Аккаунт отображается как подключенный

### Синхронизация данных

1. После подключения доступна кнопка "Синхронизировать"
2. При нажатии происходит загрузка последних тренировок
3. Отображаются последние 5 активностей с деталями
4. Доступна загрузка TCX файлов для каждой тренировки

### Отключение

1. Пользователь может отключить аккаунт кнопкой "Отключить"
2. Все токены удаляются из localStorage
3. Данные о тренировках скрываются

## API Endpoints

### Polar Flow API v3

- **Авторизация**: `https://flow.polar.com/oauth2/authorization`
- **Токены**: `https://www.polar.com/accesslink/3/oauth/token`
- **Профиль**: `https://www.polar.com/accesslink/3/users/profile`
- **Активности**: `https://www.polar.com/accesslink/3/users/activity`

### Scopes

- `read` - базовое чтение профиля
- `read_activities` - чтение тренировок
- `read_profile` - чтение деталей профиля

## Типы данных

### PolarActivity
```typescript
interface PolarActivity {
  id: string;
  name: string;
  type: string;
  startTime: string;
  duration: number;
  distance?: number;
  calories: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  averageSpeed?: number;
  maxSpeed?: number;
  route?: PolarRoute;
  trainingLoad?: number;
  recoveryTime?: number;
}
```

### PolarUser
```typescript
interface PolarUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  weight?: number;
  height?: number;
  maxHeartRate?: number;
  restingHeartRate?: number;
  vo2Max?: number;
}
```

## Обработка ошибок

### Типичные ошибки

1. **Ошибка авторизации** - неверные API ключи
2. **Ошибка токена** - истекший или недействительный токен
3. **Ошибка сети** - проблемы с подключением к Polar API
4. **Ошибка синхронизации** - проблемы с получением данных

### Логирование

Все ошибки логируются в консоль браузера с детальным описанием для отладки.

## Безопасность

### OAuth 2.0 Flow

1. **State параметр** - защита от CSRF атак
2. **HTTPS только** - все API вызовы через защищенное соединение
3. **Токены в localStorage** - временное решение, планируется перенос на backend
4. **Автоматическое обновление** - refresh токены обновляются автоматически

### Рекомендации по продакшену

1. Перенести обработку OAuth на backend
2. Хранить токены в защищенной базе данных
3. Добавить rate limiting для API вызовов
4. Реализовать webhook для автоматической синхронизации

## Тестирование

### Демо режим

В режиме разработки используется демо-сервис с имитацией API вызовов:
- Генерируются демо-токены
- Возвращаются тестовые данные тренировок
- Имитируются задержки сети

### Тестовые данные

Демо-активности включают:
- Бег (10км, 1 час)
- Велосипед (25км, 1.5 часа)
- Силовая тренировка (45 минут)
- Плавание (1.5км, 30 минут)
- Йога (1 час)

## Планы развития

### Краткосрочные (1-2 месяца)
- [ ] Реальная интеграция с Polar API
- [ ] Backend для обработки OAuth
- [ ] Автоматическая синхронизация

### Среднесрочные (3-6 месяцев)
- [ ] Webhook для real-time обновлений
- [ ] Аналитика тренировочной нагрузки
- [ ] Интеграция с календарем тренировок

### Долгосрочные (6+ месяцев)
- [ ] Машинное обучение для анализа прогресса
- [ ] Персонализированные рекомендации
- [ ] Интеграция с другими фитнес-платформами

## Поддержка

### Документация Polar
- [Polar AccessLink API](https://www.polar.com/accesslink/)
- [OAuth 2.0 Guide](https://www.polar.com/accesslink/api/oauth2)
- [API Reference](https://www.polar.com/accesslink/api/)

### Контакты
- Polar Developer Support: developer@polar.com
- T-Sync Team: support@t-sync.com

## Лицензия

Интеграция Polar Flow является частью проекта T-Sync и распространяется под той же лицензией.
