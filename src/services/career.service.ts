import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Weapon} from '../interfaces/weapon';
import {Career} from '../interfaces/career';
import {Id} from '../interfaces/id';
import {Armour} from '../interfaces/armour';
import {StaticMethods} from '../constants/static-methods';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  // OPTIONS
  race: string;
  armourOption = <string> 'primary';
  // PRIMARY CAREER
  private careerName = new BehaviorSubject<string>('');
  private careerWeapons = new Subject<Weapon>();
  private careerChosenWeapons = new Subject<Weapon>();
  private careerArmourType = new Subject<string>();
  private careerArmourPoints = new Subject<number>();
  private careerArmour = new Subject<any>();
  private careerTalents = new Subject<string[]>();
  private careerChosenTalents = new Subject<string[]>();
  private careerSkills = new Subject<string[]>();
  private careerChosenSkills = new Subject<string[]>();
  private careerTrappings = new Subject<string>();
  private careerChosenTrappings = new Subject<string[]>();
  private careerMoney = new Subject<number>();
  // CAREER TABLE VARIABLES
  private careerIdTable = new BehaviorSubject<string[]>([]);
  private careerAllIdTable = new BehaviorSubject<string[]>([]);
  private careerNameTable = new BehaviorSubject<string[]>([]);
  private careerAllNamesTable = new BehaviorSubject<string[]>([]);
  // PROFILE VARIABLES
  private careerMainProfile = new Subject<number[]>();
  private careerSecondaryProfile = new Subject<any[]>();
  private careerTalentsInfluences = new Subject<any[]>();
  // EOG
  private end = new BehaviorSubject<string>('main');
  private finish = new BehaviorSubject<string>('start');

  constructor(private http: HttpClient) {}

  addCareer (id: string): void {
    this.fetchCareerInfo(id).subscribe((careers: Career) => {
      this.careerName.next(careers.careerName);
      this.careerSkills.next(careers.skills);
      this.careerMainProfile.next(careers.mainProfile);
      this.careerSecondaryProfile.next(careers.secondaryProfile);
      this.careerTalents.next(careers.talents);
      // *CHECK ARMOUR, MONEY & WEAPONS
      careers.trappings.forEach(trapping => {
        if (trapping.search('pancerz') !== -1) {
          if (this.armourOption === 'primary') {
            if (trapping.search('lekki pancerz') !== -1) {
              // **CHECK LIGHT ARMOUR
              this.careerArmourType.next('lekki pancerz');
              this.careerArmourPoints.next(1);
            } else if (trapping.search('średni pancerz') !== -1) {
              // **CHECK MEDIUM ARMOUR
              this.careerArmourType.next('średni pancerz');
              this.careerArmourPoints.next(3);
            }
          } else {
            if (trapping.search('lekki pancerz') !== -1 || trapping.search('średni pancerz') !== -1) {
              trapping.slice(trapping.indexOf('(') + 1, trapping.indexOf(')')).split(' i ').forEach(armour => {
                this.fetchArmourInfo(armour).subscribe((arm: Armour) => {
                  if (arm) {
                    this.careerArmour.next(arm);
                  }
                });
              });
            }
          }
          // *CHECK MONEY
        } else if (trapping === '1k10 zk') {
          this.careerMoney.next(StaticMethods.rollK10());
        } else if (trapping === '2k10 zk') {
          this.careerMoney.next(StaticMethods.rollK10() + StaticMethods.rollK10());
        } else {
          // *CHECK WEAPONS
          this.fetchWeaponInfo(trapping).subscribe((weapon: Weapon) => {
            if (weapon) {
              this.careerWeapons.next(weapon);
            } else {
              // **GET REST OF TRAPPINGS
              this.careerTrappings.next(trapping);
            }
          });
        }
      });
    });
    this.end.next('');
  }

  talentsInfluences(influences: any[]): void {
    this.careerTalentsInfluences.next(influences);
  }
  // CHOSEN
  chosenTrapping(trapping: string): void {
    let add = '';
    if (trapping.indexOf(' (') !== -1) {
      add = trapping.slice(trapping.indexOf(' ('), trapping.length);
      trapping = trapping.slice(0, trapping.indexOf(' ('));
    }
    this.fetchWeaponInfo(trapping).subscribe( (weapon: Weapon) => {
      if (weapon) {
        weapon.name += add;
        this.careerChosenWeapons.next(weapon);
      } else {
        this.careerChosenTrappings.next([trapping]);
      }
    });
  }

  chosenSkill(skill: string): void {
    this.careerChosenSkills.next([skill]);
  }

  chosenTalent(talent: string): void {
    this.careerChosenTalents.next([talent]);
  }
  // ROLL CAREER
  // TABLE 2-5
  rollCareer(): void {
    this.fetchId(Math.floor(Math.random() * 100) + '').subscribe((id: Id) => {
      this.addCareer(id.table[this.race === 'Człowiek' ? 0 : this.race === 'Elf' ? 1 : this.race === 'Krasnolud' ? 2 : 3]);
    });
  }
  // GET ALL CAREERS
  getAllCareers(): void {
    // *TEMPORARY VARIABLES
    const tableId = [];
    const allCareers = [];
    const allId = [];
    const tableCareers = [];
    this.fetchCareerInfo('').subscribe((careers: Career) => {
      for (let i = 0; i < 60; i++) {
        allCareers.push(careers[i].careerName);
        allId.push(careers[i].id);
      }
    });
    this.fetchId('').subscribe(ids => {
      for (let i = 0; i < 100; i++) {
        tableId.push(ids[i].table[this.race === 'Człowiek' ? 0 : this.race === 'Elf' ? 1 : this.race === 'Krasnolud' ? 2 : 3]);
      }
      tableId.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      tableId.forEach(id => {
       tableCareers.push(allCareers[allId.indexOf(id)]);
      });
    });
    this.careerAllIdTable.next(allId);
    this.careerIdTable.next(tableId);
    this.careerAllNamesTable.next(allCareers);
    this.careerNameTable.next(tableCareers);
  }

  setFinish(): void {
    this.finish.next('finish');
  }
  // GET NAMES
  getCareerName(): Observable<string> {
    return this.careerName.asObservable();
  }

  getCareerNameTable(): Observable<string[]> {
    return this.careerNameTable.asObservable();
  }

  getCareerAllNamesTable(): Observable<string[]> {
    return this.careerAllNamesTable.asObservable();
  }

  getCareerIdTable(): Observable<string[]> {
    return this.careerIdTable.asObservable();
  }

  getCareerAllIdTable(): Observable<string[]> {
    return this.careerAllIdTable.asObservable();
  }

  // GET TRAPPINGS
  getArmourType(): Observable<string> {
    return this.careerArmourType.asObservable();
  }

  getArmourPoints(): Observable<number> {
    return this.careerArmourPoints.asObservable();
  }

  getArmour(): Observable<any> {
    return this.careerArmour.asObservable();
  }

  getMoney(): Observable<number> {
    return this.careerMoney.asObservable();
  }

  getWeapons(): Observable<Weapon> {
    return this.careerWeapons.asObservable();
  }

  getTrappings(): Observable<string> {
    return this.careerTrappings.asObservable();
  }

  // GET TALENTS & SKILLS & PROFILE
  getTalents(): Observable<string[]> {
    return this.careerTalents.asObservable();
  }

  getSkills(): Observable<string[]> {
    return this.careerSkills.asObservable();
  }

  getCareerMainProfile(): Observable<number[]> {
    return this.careerMainProfile.asObservable();
  }

  getCareerSecondaryProfile(): Observable<any[]> {
    return this.careerSecondaryProfile.asObservable();
  }

  getTalentsInfluences(): Observable<any[]> {
    return this.careerTalentsInfluences.asObservable();
  }

  getChosenWeapons(): Observable<Weapon> {
    return this.careerChosenWeapons.asObservable();
  }

  getChosenTrappings(): Observable<string[]> {
    return this.careerChosenTrappings.asObservable();
  }

  getChosenTalents(): Observable<string[]> {
    return this.careerChosenTalents.asObservable();
  }

  getChosenSkills(): Observable<string[]> {
    return this.careerChosenSkills.asObservable();
  }

  getEnd(): Observable<string> {
    return this.end.asObservable();
  }

  getFinish(): Observable<string> {
    return this.finish.asObservable();
  }
  // SET OPTIONS
  setRace(race: string): void {
    this.race = race;
  }

  setArmourOptions(option: string): void {
    this.armourOption = option;
  }
  // FETCHERS
  fetchId(roll: string) {
    return this.http.get(`${environment.apiUrl}/rolls/${roll}`);
  }

  fetchCareerInfo(id: string) {
    return this.http.get(`${environment.apiUrl}/careers/${id}`);
  }

  fetchWeaponInfo(weapon: string) {
    return this.http.get(`${environment.apiUrl}/weapons/${weapon}`);
  }

  fetchArmourInfo(armour: string) {
    return this.http.get(`${environment.apiUrl}/armours/${armour}`);
  }

  fetchTrappingInfo(trapping: string) {
    return this.http.get(`${environment.apiUrl}/trappings/${trapping}`);
  }

}
