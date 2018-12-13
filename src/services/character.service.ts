import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Race} from '../interfaces/race';
import {ROLL_TALENTS, STARTING_TRAPPINGS} from '../constants/constants';
import {StaticMethods} from '../constants/static-methods';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  // BUFFS
  raceBuff: string;
  genderBuff: string;
  // PHASE #1
  private race = new BehaviorSubject<string>('');
  private gender = new BehaviorSubject<string>('');
  private raceTalents = new Subject<string[]>();
  private raceSkills = new Subject<string[]>();
  private startingTrappings = new Subject<string[]>();
  private confirmationP1 = new BehaviorSubject<boolean>(false);
  // PHASE #2
  private mercy = new BehaviorSubject<boolean>(true);
  private confirmationP2 = new Subject<boolean>();
  // PHASE #3
  private name = new BehaviorSubject<string>('');
  private tableName = new Subject<string[]>();
  private confirmationP3 = new BehaviorSubject<boolean>(false);
  // PHASE #4
  private speed = new BehaviorSubject<number>(0);
  //
  constructor(private http: HttpClient) {}
  // PHASE #1
  setRace(race: string): void {
    this.race.next(race);
    this.raceBuff = race;
  }
  setGender(gender: string): void {
    this.gender.next(gender);
    this.genderBuff = gender;
  }
  startRoll(): void {
    this.confirmationP1.next(true); // roll character-profile stats
    this.startingTrappings.next(STARTING_TRAPPINGS);
    this.fetchProfileInfo(this.raceBuff).subscribe( (info: Race) => {
      this.raceSkills.next(info.skills);
      info.talents.forEach( talent => {
        if (talent === 'roll talent') {
            talent = StaticMethods.rollTalent(this.raceBuff);
        }
        this.raceTalents.next([talent]);
      });
    });
  }

  // PHASE #2
  setMercy(): void {
    this.mercy.next(false);
  }
  disableMercy(): void {
    this.confirmationP2.next(true);
  }
  // PHASE #3
  // TABLES 2-(18-21)
  rollName(): void {
    if ( this.genderBuff === 'kobieta') {
      this.fetchProfileInfo(this.raceBuff).subscribe( name => {
        this.name.next(name['femaleName'][Math.floor(Math.random() * 20)]);
      });
    } else {
      this.fetchProfileInfo(this.raceBuff).subscribe(name => {
        this.name.next(name['maleName'][Math.floor(Math.random() * 20)]);
      });
    }
  }
  chooseName(): void {
    this.fetchProfileInfo(this.raceBuff).subscribe( name => {
      if ( this.genderBuff === 'kobieta') {
        this.tableName.next(name['femaleName']);
      } else {
        this.tableName.next(name['maleName']);
      }
    });
  }
  setName(name: string): void {
    this.name.next(name);
  }
  confirmName(): void {
    this.confirmationP3.next(true);
  }
  // phase #4
  setSpeed(speed: number): void {
    this.speed.next(speed);
  }
  // phase #1 getters
  getRace(): Observable<string> {
    return this.race.asObservable();
  }
  getGender(): Observable<string> {
    return this.gender.asObservable();
  }
  getRaceTalents(): Observable<string[]> {
    return this.raceTalents.asObservable();
  }
  getRaceSkill(): Observable<string[]> {
    return this.raceSkills.asObservable();
  }
  getStartingTrappings(): Observable<string[]> {
    return this.startingTrappings.asObservable();
  }
  getConfirmationP1(): Observable<boolean> {
    return this.confirmationP1.asObservable();
  }
  // phase #2 getters
  getMercy(): Observable<boolean> {
    return this.mercy.asObservable();
  }
  getConfirmationP2(): Observable<boolean> {
    return this.confirmationP2.asObservable();
  }
  // phase #3 getters
  getName(): Observable<string> {
    return this.name.asObservable();
  }
  getTableName(): Observable<string[]> {
    return this.tableName.asObservable();
  }
  getConfirmationP3(): Observable<boolean> {
    return this.confirmationP3.asObservable();
  }
  // phase #4 getters
  getSpeed(): Observable<number> {
    return this.speed.asObservable();
  }
  // fetchers
  fetchProfileInfo(race: string) {
    return this.http.get(`${environment.apiUrl}/races/${race}`);
  }
  fetchTalentsInfo(talent: string) {
    return this.http.get( `${environment.apiUrl}/talents/${talent}`);
  }
  fetchSkillsInfo(skill: string) {
    return this.http.get( `${environment.apiUrl}/skills/${skill}`);
  }
}
