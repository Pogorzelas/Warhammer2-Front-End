import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from '../components/navigation-bar/navigation-bar.component';
import { SheetComponent } from '../components/content/sheet/sheet.component';
import { GeneratorComponent } from '../components/content/generator/generator.component';
import { CharacterComponent } from '../components/content/sheet/character/character.component';
import { PersonalDetailsComponent } from '../components/content/sheet/personal-details/personal-details.component';
import { CharacterProfileComponent } from '../components/content/sheet/character-profile/character-profile.component';
import { WeaponsComponent } from '../components/content/sheet/weapons/weapons.component';
import { ArmourComponent } from '../components/content/sheet/armour/armour.component';
import { PlayerComponent } from '../components/content/sheet/player/player.component';
import { ExperiencePointsComponent } from '../components/content/sheet/experience-points/experience-points.component';
import { CombatMovementComponent } from '../components/content/sheet/combat-movement/combat-movement.component';
import { ArmourPointsComponent } from '../components/content/sheet/armour-points/armour-points.component';
import { ActionSummaryComponent } from '../components/content/sheet/action-summary/action-summary.component';
import { TalentsComponent } from '../components/content/sheet/talents/talents.component';
import { TrappingsComponent } from '../components/content/sheet/trappings/trappings.component';
import { MoneyComponent } from '../components/content/sheet/money/money.component';
import { SkillsComponent } from '../components/content/sheet/skills/skills.component';
import { OptionsComponent } from '../components/content/generator/options/options.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NameComponent } from '../components/content/generator/options/name/name.component';
import { RollNameComponent } from '../components/content/generator/options/name/roll-name/roll-name.component';
import { ChooseNameComponent } from '../components/content/generator/options/name/choose-name/choose-name.component';
import { SetNameComponent } from '../components/content/generator/options/name/set-name/set-name.component';
import { CareerComponent } from '../components/content/generator/options/career/career.component';
import { AppRoutingModule } from './app-routing.module';
import { RollCareerComponent } from '../components/content/generator/options/career/roll-career/roll-career.component';
import { ChooseFromAllComponent } from '../components/content/generator/options/career/choose-from-all/choose-from-all.component';
import { ChooseBetweenComponent } from '../components/content/generator/choose-between/choose-between.component';
import { RaceGenderArmourComponent } from '../components/content/generator/options/race-gender-armour/race-gender-armour.component';
import { MercyComponent } from '../components/content/generator/options/mercy/mercy.component';


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
