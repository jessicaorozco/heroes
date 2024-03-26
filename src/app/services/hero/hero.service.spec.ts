import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {
  let service: HeroService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });

    service = TestBed.inject(HeroService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should return expected heroes', () => {
    const mockHeroes = [
      { id: 1, name: 'Windstorm', power: 'Controlling wind' },
      { id: 2, name: 'Bombasto', power: 'Super strength' }
    ];

    const mockResponse = {
      heroes: mockHeroes
    };

  
    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });
  });
});
