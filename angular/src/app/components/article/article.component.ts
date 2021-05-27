import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {Global} from '../../services/global';
import {Article} from '../../models/article';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {
  public article: Article;
  public url:string;

  constructor(
    private _articleService: ArticleService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.url = Global.url;

  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article=response.article;

          }else{
            this._router.navigate(['/home']);
          }

        },
        error =>{
          console.log(error);
        }
      );
    });

  }

}
