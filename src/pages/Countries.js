import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row } from 'react-bootstrap';
import { Item } from '../components/Item';

export const Countries = () => {
  const [state, setState] = useState({
    isLoading: false,
    items: [],
    isError: null,
    limitItems: [],
    hasMore: true,
  });

  console.log(state.items);

  useEffect(() => {
    const getCountires = async () => {
      try {
        setState((prev) => {
          return { ...prev, isLoading: true };
        });
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        const limitData = data.splice(0, 10);

        setState((prev) => {
          return {
            ...prev,
            items: data,
            limitItems: prev.limitItems.concat(limitData),
            isLoading: false,
          };
        });
      } catch (err) {
        setState((prev) => {
          return { ...prev, isError: err, isLoading: false };
        });
      }
    };
    getCountires();
  }, []);

  const fetchMoreData = () => {
    if (state.items.length === 0) {
      setState((prev) => {
        return { ...prev, hasMore: false };
      });
      return;
    }
    const limitData = state.items.splice(0, 10);
    setTimeout(() => {
      setState((prev) => {
        return { ...prev, limitItems: prev.limitItems.concat(limitData) };
      });
    }, 1500);
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          state.hasMore ? <h4>Loading...</h4> : <h4>No more content left...</h4>
        }
      >
        <Row>
          {state.limitItems &&
            state.limitItems.map((el) => {
              return <Item data={el} />;
            })}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};
