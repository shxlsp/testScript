const Comp = ({ children }) => {
  console.log(React.Component.prototype, "????????");
  const res = React.Children.map(children, (v) => {
    if (typeof v.type === "string") {
      return v;
    }
    // eslint-disable-next-line no-proto
    if (v.type.prototype.__proto__ === React.Component.prototype) {
      const ClassComp = v.type;
      const comp = new ClassComp(v.props);
      return React.Children.map(comp.render(), (v) => {
        return React.cloneElement(v, {
          className: "testClassName",
          onClick: () => console.log(1111),
        });
      });
    }
    if (v.type instanceof Function) {
      console.log(v, v.type, "innnnn map");
      return React.Children.map(v.type(), (v) => {
        return React.cloneElement(v, {
          className: "testClassName",
          onClick: () => console.log(1111),
        });
      });
    }
    return v;
  });
  return (
    <div>
      1111
      {res}
    </div>
  );
};
const ChildrenComp = () => {
  return <div>组件children</div>;
};

class ChildrenClassComp extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      a: "state",
    };
  }
  render(): React.ReactNode {
    return (
      <div>
        {/* @ts-ignore */}
        class 组件children{this.state.a}?????111
        {this.props.state}
        <div>33333</div>
      </div>
    );
  }
}
const Test = () => {
  const state = 123123;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 13333,
      }}
    >
      <Comp>
        <div>第一个children</div>
        <ChildrenComp />
        <ChildrenClassComp state={state} />
      </Comp>
    </div>
  );
};

export default Test;
