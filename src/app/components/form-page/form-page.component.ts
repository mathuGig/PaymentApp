import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  HostBinding,
  inject,
  model,
} from "@angular/core";

import { CommonModule } from "@angular/common";

import {
  Router,
  RouterModule,
  RouterOutlet,
  ChildrenOutletContexts,
  RouterLink,
} from "@angular/router";

import {
  NgForm,
  FormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { provideNativeDateAdapter } from "@angular/material/core";

import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

import { DataService } from "../../service/data.service";

import * as _moment from "moment";
import { default as _rollupMoment, Moment } from "moment";

const moment = _rollupMoment || _moment;

export interface DialogData {
  message: string;
  responseCode: string;
  invoiceNo: string;
  product: string;
  Date: string;
  Amount: string;
  Currency: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YY",
  },
  display: {
    dateInput: "MM/YY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-form-page",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./form-page.component.html",
  styleUrl: "./form-page.component.css",
  providers: [provideNativeDateAdapter(), provideMomentDateAdapter(MY_FORMATS)],
})
export class FormPageComponent implements OnInit {
  @HostBinding("@.disabled")
  public animationsDisabled = false;

  data: any;
  cardData: any;
  readonly dialog = inject(MatDialog);

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  isRequired = new FormControl("", [Validators.required]);

  cardInformationForm!: FormGroup;
  submitted = false;

  constructor(
    private dataService: DataService,
    private contexts: ChildrenOutletContexts,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  now = new Date();
  today = new Date();
  until = new Date(this.now.getFullYear() + 10, this.now.getMonth());

  title = "payment-app";

  onSubmit() {
    this.cardInformationForm.value.expiry = this.date.value?.format("MM/YY");

    this.submitted = true;

    // stop here if form is invalid
    if (this.cardInformationForm.invalid) {
      console.log(this.cardInformationForm.invalid);
      return;
    }
    // display form values on success
    this.dataService
      .payment(this.cardInformationForm.value)
      .subscribe((response: any) => {
        console.log("subscribe=>", response);
        const dialogRef = this.dialog.open(DialogContentSuccessDialog, {
          data: {
            message: response.message,
            responseCode: response.responseCode,
            invoiceNo: response.invoiceNo,
            product: this.cardData.product,
            Date: this.cardData.Date,
            Amount: this.cardData.Amount,
            Currency: this.cardData.Currency,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      });
  }
  ngOnInit() {
    this.dataService.getType().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });

    this.cardData = this.dataService.getData();

    this.cardInformationForm = this.formBuilder.group({
      cardSchemeId: ["", Validators.required],
      cardNumber: ["", Validators.required],
      expiry: [""],
      name: ["", Validators.required],
      email: ["", [Validators.email]],
    });
  }
  get f() {
    return this.cardInformationForm.controls;
  }

  getRouteAnimationData() {
    return this.contexts.getContext("primary")?.route?.snapshot?.data?.[
      "animation"
    ];
  }
  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }

  readonly date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}

@Component({
  selector: "dialog-content-success-dialog",
  templateUrl: "./dialog-content-success-dialog.html",
  styleUrl: "./form-page.component.css",
  
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentSuccessDialog {
  readonly dialogRef = inject(MatDialogRef<DialogContentSuccessDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
