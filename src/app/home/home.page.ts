import { Component } from '@angular/core';
import { NON_BINDABLE_ATTR } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  display ='0'; //  initial or displayed num
  firstval : number = null; // variable of result number
  operator : any = null; // variable to hold calculations operator
  newcursor = false; // variable checks if the operand in the left or right 
  isc = false; // variable checks if the clear button is C or AC
  iscoma = false; // variable checks if contains comma or not by click comma button
  
  constructor() {}
  click(val: any) {
    switch(val) {
      case 'ac':
        this.display = '0';
        this.firstval = null;
        this.operator = null;
        this.newcursor = false;
        break;
      case 'c':
        this.display = '0';
        this.isc = false;
        break;
      case '+/-':
        if (Math.sign(parseInt(this.display , 0)) === 1) {
           const sign = -Math.abs(parseInt(this.display , 0));
           this.display = sign.toString();
        } else if(Math.sign(parseInt(this.display , 0)) === -1){
          const sign = Math.abs(parseInt(this.display , 0));
           this.display = sign.toString();
        } else {
          this.display = this.display;
        }
        break;
      case '%':
        this.addpercent();
        break;  
      case ':' :
        this.addoperator(':');
        break;
      case 'X':
        this.addoperator('X');
        break;
      case '-':
        this.addoperator('-');
        break;
      case '+':
        this.addoperator('+');
        break;
      case '=':
        if(this.firstval !== null && this.operator !== null) {
          this.calclast();
        }
        this.operator = null;
        break;
      case '0':
        this.addnumber('0');
        break;
      case '1':
        this.addnumber('1');
        break;
      case '2':
        this.addnumber('2');
        break;
      case '3':
        this.addnumber('3');
        break;
      case '4':
        this.addnumber('4');
        break;
      case '5':
        this.addnumber('5');
        break;
      case '6':
        this.addnumber('6');
        break;
      case '7':
        this.addnumber('7');
        break;
      case '8':
        this.addnumber('8');
        break;
      case '9':
          this.addnumber('9');
          break;
      case ',':
        this.addcomma();
           break;   


    }
  }
  addcomma() {
    if (this.iscoma === false) {
      this.iscoma = true;
    } else {
      this.iscoma = false;
      }
    }
  addnumber(nbr:string){
    if (nbr === '0'){
      if(this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } else if(this.display !== '0') {
        if (this.iscoma === true){
          this.display = `${this.display.toString()}.${nbr}`;
        } else {
          this.display = this.display.toString() + nbr ;
        }
      } else if (this.display === '0') {
        if (this.iscoma === true){
          this.display = `${this.display.toString()}.${nbr}`;
        }
      }
    }else {
      if (this.newcursor === true){
        this.display = nbr;
        this.newcursor = false;
      } else if (this.display === '0'){
         if(this.iscoma === true) {
           if(this.display.toString().indexOf('.') > -1 ){
             this.display = this.display.toString() + nbr;
           }else {
             this.display = `${this.display.toString()}.${nbr}`;
           }
         } else {
           this.display = nbr ;
         }
      } else{
        if(this.iscoma ===  true) {
          if(this.display.toString().indexOf('.') > -1) {
            this.display = this.display.toString() +nbr;
          } else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        }else{
          this.display = this.display.toString() + nbr ;
        }
      }
    }
    this.isc = true;
  }
   addpercent() {
     this.iscoma = false;
     const dispval = parseInt(this.display,0) / 100;
     this.display = dispval.toString();
   }
  
   addoperator(op:string) {
     if (this.newcursor === false) {
       if(this.firstval === null) {
         if(this.iscoma === true) {
             this.firstval = parseFloat(this.display);
         } else {
           this.firstval = parseInt(this.display, 0);
         }
       }
       if(this.firstval !== null && this.operator !== null) {
         this.calclast();
       }
     }
     this.iscoma = false;
     this.operator = op;
     this.newcursor = true;
   }

   calclast() {
     switch (this.operator) {
       case ':':
         if (this.iscoma === true) {
           this.firstval = (this.firstval / parseFloat(this.display));
         } else {
           this.firstval = (this.firstval / parseInt(this.display,0));
         }
         break;
       case 'X':
            if (this.iscoma === true) {
              this.firstval = (this.firstval * parseFloat(this.display));
            } else {
              this.firstval = (this.firstval * parseInt(this.display,0));
            }
            break;
            case '+':
            if (this.iscoma === true) {
              this.firstval = (this.firstval + parseFloat(this.display));
            } else {
              this.firstval = (this.firstval + parseInt(this.display,0));
            }
            break;
            case '-':
            if (this.iscoma === true) {
              this.firstval = (this.firstval - parseFloat(this.display));
            } else {
              this.firstval = (this.firstval - parseInt(this.display,0));
            }
            break;
          }  
          this.display = this.firstval.toString();
     }
   }







