import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { routing } from './mathbet.routes'
import { AHttpProvider } from '@adoreme/bsf-authz';
import { LeagueComponent } from "./containers/league.component";
import { MathBetComponent } from "./mathbet.component";

@NgModule({
    imports: [ CommonModule, HttpModule, routing ],
    declarations: [LeagueComponent, MathBetComponent ],
    providers: [],
    exports: [ LeagueComponent, MathBetComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class MathBetModule {}
