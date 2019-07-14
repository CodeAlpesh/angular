import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http
      .post<{name : string}>(
        'https://recipebook-36c22.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get<{ [key: string]: Post}>('https://recipebook-36c22.firebaseio.com/posts.json')
    .pipe(map((responseData) => {
        const postsArray: Post[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            const post = {...responseData[key], id:key};
            postsArray.push(post);
          }
        }
        return postsArray;
      }
    ))
    .subscribe(
      (responseData: Post[]) => {
        console.log(responseData);
        this.loadedPosts = responseData;  
      }
    )
  }
}