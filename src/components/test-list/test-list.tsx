import React from 'react';

interface TestListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function TestList<T>(props: TestListProps<T>) {
  return <div>{props.items.map(props.renderItem)}</div>;
}

export default TestList;
