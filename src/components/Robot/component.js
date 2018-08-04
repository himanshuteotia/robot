import React, { Component } from "react";

export default class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      direction: "SOUTH",
      report: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.move = this.move.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.shiftTheRobot = this.shiftTheRobot.bind(this);
    this.report = this.report.bind(this);
    this.robotRef = React.createRef();
  }

  componentWillMount() {
    console.log(this.containerRef);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, report: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.shiftTheRobot();
  }

  shiftTheRobot() {
    let x = this.state.x * 100;
    let y = this.state.y * 100;
    let direction = this.state.direction;
    const { DEGREE } = this.props;
    this.robotRef.current.style.left = `${x}px`;
    this.robotRef.current.style.bottom = `${y}px`;
    this.robotRef.current.style.transform = `rotate(-${DEGREE[direction]}deg)`;
  }
  moveLeft() {
    switch (this.state.direction) {
      case "WEST":
        this.robotRef.current.style.transform = `rotate(${-180}deg)`;
        this.setState({ direction: "NORTH" });
        break;
      case "NORTH":
        this.robotRef.current.style.transform = `rotate(${-270}deg)`;
        this.setState({ direction: "EAST" });
        break;
      case "EAST":
        this.robotRef.current.style.transform = `rotate(${-360}deg)`;
        this.setState({ direction: "SOUTH" });
        break;
      case "SOUTH":
        console.log("SOUTH");
        this.robotRef.current.style.transform = `rotate(${-90}deg)`;
        this.setState({ direction: "WEST" });
        break;
      default:
        console.log("No Direction findout");
    }
  }
  moveRight() {
    switch (this.state.direction) {
      case "WEST":
        this.robotRef.current.style.transform = `rotate(${360}deg)`;
        this.setState({ direction: "SOUTH" });
        break;
      case "NORTH":
        this.robotRef.current.style.transform = `rotate(${270}deg)`;
        this.setState({ direction: "WEST" });
        break;
      case "EAST":
        this.robotRef.current.style.transform = `rotate(${180}deg)`;
        this.setState({ direction: "NORTH" });
        break;
      case "SOUTH":
        this.robotRef.current.style.transform = `rotate(${90}deg)`;
        this.setState({ direction: "EAST" });
        break;
      default:
        console.log("No Direction findout");
    }
  }

  move() {
    let { x, y } = this.state;
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    const { MAX_VALUE, MIN_VALUE } = this.props;
    switch (this.state.direction) {
      case "NORTH":
        if (y < MAX_VALUE && y >= MIN_VALUE) {
          this.robotRef.current.style.bottom = `${y * 100 + 100}px`;
          this.setState({ y: y + 1 });
        }
        break;
      case "SOUTH":
        if (y <= MAX_VALUE && y > MIN_VALUE) {
          this.robotRef.current.style.bottom = `${y * 100 - 100}px`;
          this.setState({ y: y - 1 });
        }
        break;
      case "WEST":
        if (x < MAX_VALUE && x >= MIN_VALUE) {
          this.robotRef.current.style.left = `${x * 100 + 100}px`;
          this.setState({ x: x + 1 });
        }
        break;
      case "EAST":
        if (x <= MAX_VALUE && x > MIN_VALUE) {
          this.robotRef.current.style.left = `${x * 100 - 100}px`;
          this.setState({ x: x - 1 });
        }
        break;
      default:
        console.log("Wrong position");
    }
  }

  report() {
    this.setState({ report: true });
  }

  render() {
    const { CONTAINER_HEIGHT, CONTAINER_WIDTH } = this.props;
    const { x, y, direction, report } = this.state;
    return (
      <div className="wrap">
        <div className="field">
          <h1>Table</h1>
          <div
            id="container"
            style={{ height: CONTAINER_HEIGHT, width: CONTAINER_WIDTH }}
          >
            <div id="box" ref={this.robotRef} />
          </div>
        </div>

        <div className="controls">
          <h1>Controls</h1>
          <div className="control-group main">
            <form onSubmit={this.handleSubmit}>
              <label>X Coordinate</label>
              <input
                className="placeX"
                name="x"
                value={this.state.x}
                onChange={event => this.handleChange(event)}
                type="number"
              />

              <label>Y Coordinate</label>
              <input
                className="placeY"
                name="y"
                value={this.state.y}
                onChange={event => this.handleChange(event)}
                type="number"
              />

              <label>Direction Facing</label>
              <select
                className="placeDirection"
                name="direction"
                value={this.state.value}
                onChange={event => this.handleChange(event)}
              >
                <option value="SOUTH">SOUTH</option>
                <option value="WEST">WEST</option>
                <option value="NORTH">NORTH</option>
                <option value="EAST">EAST</option>
              </select>

              <input className="place" type="submit" value="PLACE" />
            </form>
          </div>
          <div className="control-group flex">
            <button className="move" onClick={this.move}>
              Move
            </button>
            <button className="rotateLeft" onClick={this.moveLeft}>
              Rotate Left
            </button>
            <button className="rotateRight" onClick={this.moveRight}>
              Rotate Right
            </button>
            <button className="report" onClick={this.report}>
              Report
            </button>
          </div>
          <div className="log">
            {report ? (
              <div>
                <p>
                  {`You are in (${x} , ${y}) position and ${direction} direction`}{" "}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

Robot.defaultProps = {
  MAX_VALUE: 4,
  MIN_VALUE: 0,
  CONTAINER_HEIGHT: 500,
  CONTAINER_WIDTH: 500,
  DEGREE: {
    SOUTH: 0,
    WEST: 90,
    NORTH: 180,
    EAST: 270
  }
};
