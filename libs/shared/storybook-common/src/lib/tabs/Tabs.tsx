import React, { Children, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 *
 * @example
 *  <Tabs>
 *    <Tab label="Assets">Assets Content</Tab>
 *    <Tab label="Settings">Settings Content</Tab>
 *    <Tab label="Info">Info Content</Tab>
 *  </Tabs>
 */

interface TabsProps {
  activeIndex?: number;
  children: ReactNode;
}

function Tabs(props: TabsProps): JSX.Element {
  const [activeTabIndex, setActiveTabIndex] = useState(props.activeIndex);

  function selectTab(index: number) {
    setActiveTabIndex(index);
  }

  useEffect(() => {
    setActiveTabIndex(props.activeIndex ?? 0);
  }, [props.activeIndex]);

  return (
    <>
      <SCTabs>
        {
          // eslint-disable-next-line
          Children.map<JSX.Element, any>(props.children, (child: any, index: number) => {
            return (
              <TabItem active={activeTabIndex === index} onSelect={() => selectTab(index)}>
                {child.props.label}
              </TabItem>
            );
          })
        }
      </SCTabs>
      {
        // eslint-disable-next-line
        Children.toArray(props.children).filter((_child: any, index: number) => {
          return index === activeTabIndex;
        })
      }
    </>
  );
}

interface TabProps {
  label: string;
}

function Tab(props: TabProps & { children: ReactNode }): JSX.Element {
  return <TabContent>{props.children}</TabContent>;
}

export { Tabs, Tab };

// *******
// Private
// *******

interface TabItemProps {
  onSelect: () => void;
  active?: boolean;
}

function TabItem(props: TabItemProps & { children: ReactNode }) {
  function selectTab() {
    props.onSelect();
  }
  return (
    <SCTab className={props.active && 'active'} onClick={() => selectTab()}>
      {props.children}
    </SCTab>
  );
}

// *****************
// Styled Components
// *****************

const SCTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  overflow-x: auto;
`;

const SCTab = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  min-width: 6rem;
  text-align: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: background-color 500ms, border-bottom-width 100ms;
  padding-bottom: calc(0.5rem + 4px);
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  font-family: acumin-pro-semi-condensed, sans-serif !important;

  &:hover,
  &:active {
    background-color: #eee;
  }

  &.active {
    border-bottom: 4px solid var(--color-blue);
    padding-bottom: 0;
  }

`;

const TabContent = styled.div`
  padding: 1rem 0;

  > h1,
  > h2,
  > h3,
  > h4,
  > ul,
  > ol {
    margin-top: 0;
  }

  pre {
    padding: 1rem!important;
    background-color: #fafafa!important;
  }
`;
