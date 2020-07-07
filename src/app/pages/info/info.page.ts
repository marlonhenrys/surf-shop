import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/interfaces/produto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  private produtoId: string = null;
  public produto: Produto = {};
  private productSubscription: Subscription;

  constructor(private productService: ProdutoService,
    private activatedRoute: ActivatedRoute) {
    this.produtoId = this.activatedRoute.snapshot.params['id'];

    if (this.produtoId) this.loadProduct();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct() {
    this.productSubscription = this.productService.getProduct(this.produtoId).subscribe(data => {
      this.produto = data;
    });
  }
}
