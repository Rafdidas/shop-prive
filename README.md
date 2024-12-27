# PRIVE

## 1. 소개 및  참여인원
- FakeStoreAPI 를 이용한 쇼핑몰 https://fakestoreapi.in/
- 개인 프로젝트

## 2. 사용 기술
#### `API`
  - FakeStoreAPI
  - https://fakestoreapi.in/

#### `Front-end`
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
- context branch
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)

## 3. 핵심 기능
- 메인페이지에 대표 상품들을 진열
- 헤더 카테고리에서 전체상품과 각각의 카테고리 이동가
- 리스트에서 퀵카트로 담기 
- 장바구니 페이지에서 담긴 상품 확인
- 주문 페이지에서 구매할 상품 확인 가능
- 이메일 로그인, 가입, 구글 로그인 가능

## 3-1. Redux 도입
- Context-API 구성 후 Redux 도입 시도 중

### Ex) product Redux
- 상태 관리 중앙화
- 비동기 작업 통합
- createAsyncThunk를 활용해 API 호출과 상태 변화를 깔끔하게 처리
- 상태 변화 로직(pending, fulfilled, rejected)이 명확히 분리

### product.slice, product.action 으로 분리

### product.slice 부분분
#### 1. 슬라이스 생성
  ```
  const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.currentPage = 1;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ products: Products[]; page: number; category?: string }>) => {
              const { products, page, category } = action.payload;

              if (category) {
                  state.products = products;
                  state.hasMore = false;
              } else {
                  state.products = page === 1 ? products : [...state.products, ...products];
                  state.hasMore = products.length === 25;
              }

              state.currentPage = page;
              state.loading = false;
          })
          .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
              state.error = action.payload;
              state.loading = false;
          });
      },
  });
  ```
- Redux의 상태와 리듀서를 한 번에 정의
- name: 슬라이스의 이름으로, 액션 타입에 사용
- initialState: 위에서 정의한 초기 상태를 슬라이스에 연결

- reducers: 일반적인 상태 업데이트를 정의 (resetProducts)
- resetProducts: 상품 데이터를 초기화 (products를 빈 배열로 설정하고, 페이지를 1로 초기화, 더 가져올 수 있는 상태로 설정)
  
- extraReducers: 비동기 작업(fetchProducts)의 상태 변화를 처리
- pending(작업 시작 시), fulfilled(데이터 가져오기), rejected(데이터 가져오기 실패) 상태에 따른 상태 변화를 정의

#### 2. Action과 Reducer 내보내기
 ```
export const { resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
 ```
- resetProducts
- 리듀서를 내보내 다른 곳에서 호출 가능
- 예: 다른 컴포넌트에서 상품 목록 초기화

- productsSlice.reducer
- 슬라이스의 리듀서를 Redux 스토어에 연결
- 비동기 작업을 처리하기 위한 Redux Toolkit의 유틸리티
- 비동기 호출의 시작, 성공, 실패를 각각 pending, fulfilled, rejected 상태로 관리

### product.action 부분분

#### 1. createAsyncThunk
- 비동기 작업을 처리하기 위한 Redux Toolkit의 유틸리티
- 비동기 호출의 시작, 성공, 실패를 각각 pending, fulfilled, rejected 상태로 관리

#### 2. 비동기 작업 로직
  ```
  async ({ page = 1, category }: { page?: number; category?: string }, { rejectWithValue }) => {
      try {
          let url: string;
          if (category) {
              url = `https://fakestoreapi.in/api/products/category?type=${category}`;
          } else {
              url = `https://fakestoreapi.in/api/products?page=${page}&limit=25`;
          }

          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('상품 데이터를 가져오는 데 실패했습니다.');
          }

          const data: ProductResponse = await response.json();
          return { products: data.products, page, category };
      } catch (error: any) {
          return rejectWithValue(error.message || 'Error');
      }
  }
  ```
- 매개변수 : { page, category } 페이지네이션과 카테고리 필터링을 처리
- 매개변수 : { rejectWithValue } API 호출 실패 시 에러 메시지를 반환하는 함수

### store.ts 생성

## 4. 사이트 구성
   ### 메인 페이지
   - 
   ### 리스트 페이지
   - 
   ### 로그인 페이지
   - 
   ### 상세 페이지
   - 
   ### 장바구니 페이지
   - 
   ### 주문서 페이지
   -
   ### 검색 페이지
   - 예정

## 5. 핵심 트러블 슈팅