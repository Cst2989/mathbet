import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MathService } from '../mathbet.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'league',
    templateUrl: './league.template.html',
    styleUrls: [ './league.style.scss' ],
})

export class LeagueComponent implements OnInit {
  public id: any;
  public isLoaded: boolean = false;
  public isSubmited: boolean = false;
  public showInfo: boolean = false;
  public data: any;
  public matchesNr: number;
  public allTeams: any;

  public myGroup: FormGroup;
  public overValue: number ;
  public underValue: number ;

  public homeWin: number;
  public awayWin: number;
  public draw: number;
  public form: FormGroup;
  public matches: any;
  public leagueAtackStrength: number;
  public dragMatch: any;
  constructor(
    private router: Router,
    private mathService: MathService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {

     this.id = this.route.params
        .flatMap(params => {
            return this.mathService.load(params['id']);
        })
        .subscribe(r => {
          this.isSubmited = false;
          this.showInfo = false;
          this.data = r;
          this.allTeams = this.data.getTeams();
          this.matchesNr = this.allTeams.length / 2;
          this.isLoaded = true;

          this.form = new FormGroup({
            "matches": new FormArray([])
          });

          this.matches = this.form.get('matches') as FormArray;

          for (let i = 0; i < this.matchesNr; i++) {
              let myGroup = new FormGroup({
                homeTeam: new FormControl(''),
                awayTeam: new FormControl(''),
                homeWin: new FormControl(0),
                draw: new FormControl(0),
                awayWin: new FormControl(0),
                over: new FormControl(0),
                under: new FormControl(0),
              });
              this.matches.push(myGroup);
          }

        })
  }

  public drag(ev, team) {
    this.dragMatch = team;
  }

  public dragOver(ev) {
    ev.preventDefault();
  }

  public drop(ev, location, index) {
    this.form.get('matches').get(index.toString()).get(location).setValue(this.dragMatch);

    let HomeTeam = this.form.get('matches').get(index.toString()).get('homeTeam').value;
    let AwayTeam = this.form.get('matches').get(index.toString()).get('awayTeam').value;
    if (HomeTeam && AwayTeam) {
      //move to top
      let leagueHomeStrength = this.data.leagueAtackStrength();
      let leagueAwayStrength = this.data.leagueDefenseStrength();

      let homeAt = this.data.getHomeAtack(HomeTeam);
      let homeDef = this.data.getHomeDefense(HomeTeam);

      let awayAt = this.data.getAwayAtack(AwayTeam);
      let awayDef = this.data.getAwayDefense(AwayTeam);

      let predictedHomeGoals = homeAt * awayDef * leagueHomeStrength;
      let predictedAwayGoals = awayAt * homeDef * leagueAwayStrength;

      let home0 = this.probabilityCalc(0, predictedHomeGoals);
      let home1 = this.probabilityCalc(1, predictedHomeGoals);
      let home2 = this.probabilityCalc(2, predictedHomeGoals);

      let away0 = this.probabilityCalc(0, predictedAwayGoals);
      let away1 = this.probabilityCalc(1, predictedAwayGoals);
      let away2 = this.probabilityCalc(2, predictedAwayGoals);

      this.form.get('matches').get(index.toString()).get('homeWin').setValue(this.data.getHomeWin(HomeTeam, AwayTeam));
      this.form.get('matches').get(index.toString()).get('awayWin').setValue(this.data.getAwayWin(HomeTeam, AwayTeam));
      this.form.get('matches').get(index.toString()).get('draw').setValue(this.data.getDraw(HomeTeam, AwayTeam));

      let under = ((home0*away0) + (home1*away0) + (home0*away1) + (home1*away1) + (home2*away0) + (home0*away2)) * 100;
      let over = 100 - under ;

      this.form.get('matches').get(index.toString()).get('over').setValue(over);
      this.form.get('matches').get(index.toString()).get('under').setValue(under);

    }
  }

  private factorial(number){
    let sum = 1;
    for (let i = 1; i <= number; i++) {
        sum = sum*i;
    }
    return sum;
  }

  private probabilityCalc(numberGoals, predictedNumber){
      return Math.pow(predictedNumber, numberGoals) * Math.pow(Math.E, -predictedNumber) / this.factorial(numberGoals) ;
  }


}
