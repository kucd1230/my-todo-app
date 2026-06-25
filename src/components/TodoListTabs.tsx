
interface TabsProps {
  tabState: string;
  setTabState: (value: string) => void;
}

export default function Tabs({tabState, setTabState}: TabsProps) {
  const tabs = ["today", "all"]

  return (
    <ul className="todo-page-tabs">
      {tabs.map((tab) => (
        <li key={tab} className={`todo-page-tabs__item ${tabState === tab ? "is-active" : ""}`} onClick={() => setTabState(tab)}>{tab}</li>
      ))}
    </ul>
  )
}