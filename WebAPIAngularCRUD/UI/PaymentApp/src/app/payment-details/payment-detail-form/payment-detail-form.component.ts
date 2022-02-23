import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
    if(this.service.formData.paymentDetailId==0){
      this.insertRecord(form)
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm)
  {
    this.service.postPaymentDetail().subscribe(res=>{
      console.warn(res);
      this.toastr.success("Payment Details Submitted Successfully!!!");
      this.service.refreshList();
      this.resetForm(form);
    },
    err=>{console.warn(err);
    this.toastr.error("OOps!!Something went wrong!!");
    this.resetForm(form);}
    );
  }

  updateRecord(form:NgForm)
  {
    this.service.putPaymentDetail().subscribe(res=>{
      console.warn(res);
      this.toastr.info("Payment Details Updated Successfully!!!");
      this.service.refreshList();
      this.resetForm(form);
    },
    err=>{console.warn(err);
    this.toastr.error("OOps!!Something went wrong!!");
    this.resetForm(form);}
    );
  }

  onDelete(id:number)
  {
    this.service.deletePaymentDetail(id);
    this.toastr.warning("Deleted Successfully!!!");
  }

  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }

}
