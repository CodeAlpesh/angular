
import {map, tap, catchError} from 'rxjs/operators';

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../model/lesson";
import {Observable, of as observableOf} from "rxjs";


@Injectable()
export class LessonsService {

    constructor(private http: HttpClient) {

    }

    loadAllLessons() : Observable<Lesson[]> {
        return this.http.get<any>('/api/lessons').pipe(
            map(res => {
                return res.lessons
            }),
            catchError((err) => {
                return observableOf([]);
            }));
    }

    findLessonById(id:number) {
        return this.http.get<Lesson>('/api/lessons/' + id);
    }

}

