import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching = false;
  errorMessage: string;
  postsServiceSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
    this.postsServiceSubscription =  this.postsService.postSaved.subscribe(
      (saveResponse) => {
        this.onPostCreated(saveResponse)
      },
      (errorResponse: HttpErrorResponse ) => {
        this.errorMessage = errorResponse.message;
      }
    )
  }

  onCreatePost(postData: { title: string; content: string }) {
    const post :Post = { title: postData.title, content: postData.content};
    this.postsService.savePost(post);
  }

  onPostCreated(saveResponse: {name: string}) {
    console.log(saveResponse.name);
    this.fetchPosts();
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.deleteAllPosts().subscribe(
      (response) => {
        this.loadedPosts = [];
        console.log(response);
      }, 
      (errorResponse: HttpErrorResponse ) => {
        this.errorMessage = errorResponse.message;
      }
    );
  }

  fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchAllPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (errorResponse: HttpErrorResponse ) => {
        // console.log(errorResponse);
        this.isFetching = false;
        this.errorMessage = errorResponse.error.error;
        // this.errorMessage = errorResponse.message;
      }
    );    
  }

  ngOnDestroy(): void {
    this.postsServiceSubscription.unsubscribe();
  }

}