import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn : 'root'})
export class PostsService {
   
    postSaved = new Subject<{name: string}>();

    constructor(private httpClient: HttpClient) {}

    savePost(postData: Post) {
        // Send Http request
        this.httpClient
          .post<{name : string}>(
            'https://recipebook-36c22.firebaseio.com/posts.json',
            postData
          )
          .subscribe(responseData => {
            // console.log(responseData);
            this.postSaved.next(responseData);
          });
    }

    fetchAllPosts() {
        return this.httpClient
            .get<{ [key: string]: Post}>('https://recipebook-36c22.firebaseio.com/posts.json')
            .pipe(
                map((responseData) => {
                    const postsArray: Post[] = [];
                    for(const key in responseData) {
                        if(responseData.hasOwnProperty(key)) {
                            const post = {...responseData[key], id:key};
                            postsArray.push(post);
                        }
                    }
                    return postsArray;
                }
            ));
    }

    deleteAllPosts() {
        return this.httpClient
            .delete('https://recipebook-36c22.firebaseio.com/posts.json')
    }
}