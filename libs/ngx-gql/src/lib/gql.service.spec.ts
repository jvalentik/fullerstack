import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigModule } from '@fullerstack/ngx-config';
import { LoggerModule } from '@fullerstack/ngx-logger';

import { GqlService } from './gql.service';

describe('GqlService', () => {
  let service: GqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ConfigModule.forRoot(), LoggerModule],
      providers: [GqlService],
    });

    service = TestBed.inject(GqlService);
  });

  afterAll(() => {
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
