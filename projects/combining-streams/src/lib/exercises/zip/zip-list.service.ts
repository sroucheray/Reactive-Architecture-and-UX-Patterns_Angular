import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Item, List, upsertEntities} from "shared";
import {HttpClient} from "@angular/common/http";

interface ListServiceState {
  lists: List[];
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class zipListService {
  private readonly baseUrl = 'api';
  private readonly itemUrl = [this.baseUrl, 'item'].join('/');
  private readonly listUrl = [this.baseUrl, 'list'].join('/');

  private readonly state$ = new BehaviorSubject<ListServiceState>({
    lists: [] as List[],
    items: [] as Item[]
  });

  lists$ = this.state$.pipe(map(s => s.lists));
  items$ = this.state$.pipe(map(s => s.items));

  constructor(private http: HttpClient) {
  }

  refetchLists() {
    this.httpGetLists()
      .subscribe(lists => {
        this.state$.next({
          ...this.state$.getValue(),
          lists: upsertEntities(this.state$.getValue().lists, lists, 'id')
        });
      });
  }

  httpGetLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl).pipe(
      catchError(() => of([] as List[]))
    );
  }

  httpPostItems(item: Pick<Item, 'iName' | 'lId'>): Observable<Item[]> {
    return this.http.post<Item[]>(this.itemUrl, item);
  }

  addItem(item: Pick<Item, 'iName' | 'lId'>) {
    this.httpPostItems(item)
      .subscribe((v) => {
        console.log(v);
        this.refetchItems()
      }, console.log);
  }

  refetchItems() {
    this.httpGetItems()
      .subscribe(items => {
        this.state$.next({
          ...this.state$.getValue(),
          items: upsertEntities(this.state$.getValue().items, items, 'id')
        });
      });
  }

  httpGetItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemUrl).pipe(
      catchError(() => of([] as Item[]))
    );
  }

}