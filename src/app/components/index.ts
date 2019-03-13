import {HeaderComponent} from './header/header.component'
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent} from './not-found/not-found.component';


export const components: any[] = [
    HeaderComponent,
    ErrorComponent,
    NotFoundComponent
];

export * from './header/header.component';
export * from './error/error.component';
export * from './not-found/not-found.component';
