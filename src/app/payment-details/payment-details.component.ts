import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styles: [],
    standalone: false
})
export class PaymentDetailsComponent {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record')) {
      this.service.deletePaymentDetail(id).subscribe({
        next: (res) => {
          this.service.list = res as PaymentDetail[];
          this.toastr.error('Deleted successfuly', 'Payment Detail Register');
        },
        error: (err) => console.log(err),
      });
    }
  }
}
