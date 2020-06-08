import { subscribeUserToMailingUseCase } from '../useCases/subscribeUserToMailing';
import AfterUserCreated from './AfterUserCreated';
import AfterUserLoggedIn from './AfterUserLoggedIn';

// Subscribers
new AfterUserCreated(subscribeUserToMailingUseCase);
new AfterUserLoggedIn();
