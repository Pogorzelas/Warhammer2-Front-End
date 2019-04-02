import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { SheetComponent } from '../components/navigation-bar/sheet/sheet.component';
import { GeneratorComponent } from '../components/navigation-bar/generator/generator.component';
import { CharacterComponent } from '../components/navigation-bar/sheet/character/character.component';
import { PersonalDetailsComponent } from '../components/navigation-bar/sheet/personal-details/personal-details.component';
import { CharacterProfileComponent } from '../components/navigation-bar/sheet/character-profile/character-profile.component';
import { WeaponsComponent } from '../components/navigation-bar/sheet/weapons/weapons.component';
import { ArmourComponent } from '../components/navigation-bar/sheet/armour/armour.component';
import { PlayerComponent } from '../components/navigation-bar/sheet/player/player.component';
import { ExperiencePointsComponent } from '../components/navigation-bar/sheet/experience-points/experience-points.component';
import { CombatMovementComponent } from '../components/navigation-bar/sheet/combat-movement/combat-movement.component';
import { ArmourPointsComponent } from '../components/navigation-bar/sheet/armour-points/armour-points.component';
import { ActionSummaryComponent } from '../components/navigation-bar/sheet/action-summary/action-summary.component';
import { TalentsComponent } from '../components/navigation-bar/sheet/talents/talents.component';
import { TrappingsComponent } from '../components/navigation-bar/sheet/trappings/trappings.component';
import { MoneyComponent } from '../components/navigation-bar/sheet/money/money.component';
import { SkillsComponent } from '../components/navigation-bar/sheet/skills/skills.component';
import { OptionsComponent } from '../components/navigation-bar/generator/options/options.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NameComponent } from '../components/navigation-bar/generator/options/name/name.component';
import { RollNameComponent } from '../components/navigation-bar/generator/options/name/roll-name/roll-name.component';
import { ChooseNameComponent } from '../components/navigation-bar/generator/options/name/choose-name/choose-name.component';
import { SetNameComponent } from '../components/navigation-bar/generator/options/name/set-name/set-name.component';
import { CareerComponent } from '../components/navigation-bar/generator/options/career/career.component';
import { CharacterListComponent } from '../components/navigation-bar/character-list/character-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RollCareerComponent } from '../components/navigation-bar/generator/options/career/roll-career/roll-career.component';
import { ChooseFromAllComponent } from '../components/navigation-bar/generator/options/career/choose-from-all/choose-from-all.component';
import { ChooseBetweenComponent } from '../components/navigation-bar/generator/choose-between/choose-between.component';
import { RaceGenderArmourComponent } from '../components/navigation-bar/generator/options/race-gender-armour/race-gender-armour.component';
import { MercyComponent } from '../components/navigation-bar/generator/options/mercy/mercy.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SheetComponent,
    GeneratorComponent,
    CharacterComponent,
    PersonalDetailsComponent,
    CharacterProfileComponent,
    WeaponsComponent,
    ArmourComponent,
    PlayerComponent,
    ExperiencePointsComponent,
    CombatMovementComponent,
    ArmourPointsComponent,
    ActionSummaryComponent,
    TalentsComponent,
    TrappingsComponent,
    MoneyComponent,
    SkillsComponent,
    OptionsComponent,
    NameComponent,
    RollNameComponent,
    ChooseNameComponent,
    SetNameComponent,
    CareerComponent,
    CharacterListComponent,
    RollCareerComponent,
    ChooseFromAllComponent,
    ChooseBetweenComponent,
    RaceGenderArmourComponent,
    MercyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
