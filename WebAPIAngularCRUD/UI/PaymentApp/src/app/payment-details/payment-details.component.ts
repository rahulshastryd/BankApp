import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService,public toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onDelete(id:number)
  {
    this.service.deletePaymentDetail(id)
    .subscribe(res=>{
      this.toastr.error("Deleted Successfully!!")
      this.service.refreshList();
    },
    err=>{
      this.toastr.error("Something went wrong!!!")
    }
    );
    this.service.refreshList();
  }

  populateForm(selectedRecord:PaymentDetail)
  {
    // this.service.formData  = selectedRecord;
    this.service.formData = Object.assign({},selectedRecord);
  }

}
