import "./index.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "lodash";

class TableCell extends Component {
  render() {
    return (
      <input
        type="text"
        className="cell-input"
        style={{ zIndex: this.state.isTyping ? 100 : -100 }}
        ref={dom => {
          this.cellInput = dom;
        }}
        // value={this.state.inputValue}
        // onChange={this.onChangeInputValue}
        // onKeyPress={this.onInputKeyPress}
        // onKeyDown={this.onInputKeyDown}
        onDoubleClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onMouseOver={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        onMouseLeave={e => e.stopPropagation()}
        // onCopy={this.onCopy}
        // onCut={this.onCut}
        // onPaste={this.onPaste}
      />
    );
  }
}

class TableWrap extends Component {}

class ReactExcel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      rows: 0,
      columns: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { rows, columns } = getRowsAndColumns(props.data);
    return {
      data: props.data,
      rows,
      columns
    };

    function getRowsAndColumns(data) {
      let rows = 100,
        columns = 30;
      if (Array.isArray(data)) {
        rows += data.length;
        if (Array.isArray(data[0])) {
          columns += data[0].length;
        }
      }

      return { rows, columns };
    }
  }

  onLeftHeaderScroll = () => {
    const { cellHeight } = this.props;
    const { scrollTop } = this.tableLeftHeaderTbody;
    if (this.scrollTop !== scrollTop) {
      this.scrollTop = scrollTop;
      this.rightBottomWrapper.scrollTop = scrollTop;
      if (scrollTop > 0) {
        this.rightTopHeader.style.height = `${cellHeight + 1}px`;
        this.rightBottomWrapper.style.marginTop = "-1px";
        this.tableLeftHeaderThead.style.height = `${cellHeight + 1}px`;
      } else {
        this.rightTopHeader.style.height = `${cellHeight}px`;
        this.rightBottomWrapper.style.marginTop = 0;
        this.tableLeftHeaderThead.style.height = `${cellHeight}px`;
      }
    }
  };

  onTopHeaderScroll = () => {
    const { minCellWidth } = this.props;
    const { scrollLeft } = this.rightTopHeader;
    if (this.scrollLeft !== scrollLeft) {
      this.scrollLeft = scrollLeft;
      this.rightBottomWrapper.scrollLeft = scrollLeft;
      if (scrollLeft > 0) {
        this.leftWrapper.style.width = `${minCellWidth + 1}px`;
      } else {
        this.leftWrapper.style.width = `${minCellWidth}px`;
      }
    }
  };

  onInnerTableScroll = () => {
    const { minCellWidth, cellHeight } = this.props;
    const { scrollTop, scrollLeft } = this.rightBottomWrapper;
    if (this.scrollTop !== scrollTop) {
      this.scrollTop = scrollTop;
      this.tableLeftHeaderTbody.scrollTop = scrollTop;
      if (scrollTop > 0) {
        this.rightTopHeader.style.height = `${cellHeight + 1}px`;
        this.rightBottomWrapper.style.marginTop = "-1px";
        this.tableLeftHeaderThead.style.height = `${cellHeight + 1}px`;
      } else {
        this.rightTopHeader.style.height = `${cellHeight}px`;
        this.rightBottomWrapper.style.marginTop = 0;
        this.tableLeftHeaderThead.style.height = `${cellHeight}px`;
      }
    }

    if (this.scrollLeft !== scrollLeft) {
      this.scrollLeft = scrollLeft;
      this.rightTopHeader.scrollLeft = scrollLeft;
      if (scrollLeft > 0) {
        this.leftWrapper.style.width = `${minCellWidth + 1}px`;
      } else {
        this.leftWrapper.style.width = `${minCellWidth}px`;
      }
    }
  };

  renderCells = (rows, columns, data) => {
    const { cellHeight, minCellWidth } = this.props;
    return range(0, rows - 1).map(rowIndex => (
      <tr key={rowIndex}>
        {range(0, columns - 1).map(columnIndex => (
          <td
            key={columnIndex}
            style={{
              height: `${cellHeight}px`,
              minWidth: `${minCellWidth}px`
            }}
          >
            {(data[rowIndex] && data[rowIndex][columnIndex]) || ""}
          </td>
        ))}
      </tr>
    ));
  };

  render() {
    const { cellHeight, minCellWidth, pageSize } = this.props;
    const { data, rows, columns } = this.state;
    return (
      <div className="react-excel">
        <div
          className="left-wrapper"
          ref={dom => {
            this.leftWrapper = dom;
          }}
        >
          <table className="table-left-header" cellSpacing="0">
            <thead
              ref={dom => {
                this.tableLeftHeaderThead = dom;
              }}
            >
              <th
                data-col={-1}
                data-row={-1}
                // onClick={this.switchColRow}
                onContextMenu={e => e.preventDefault()}
              />
            </thead>
            <tbody
              style={{
                marginTop: `${cellHeight}px`,
                height: `${pageSize * cellHeight}px`
              }}
              // onContextMenu={this.onContextMenu}
              // onMouseDown={this.onMouseDown}
              // onMouseOver={this.onMouseOver}
              // onMouseUp={this.onMouseUp}
              ref={dom => {
                this.tableLeftHeaderTbody = dom;
              }}
              onScroll={this.onLeftHeaderScroll}
            >
              {range(1, rows).map(item => (
                <tr key={`-1-${item}`}>
                  <td
                    data-col={-1}
                    data-row={item}
                    style={{ height: `${cellHeight}px`, width: `${49 + 1}px` }}
                  >
                    {item}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="right-wrapper"
          style={{
            width: `calc(100% - ${49 + 1}px)`
          }}
        >
          <div
            className="right-top-wrapper"
            ref={dom => {
              this.rightTopHeader = dom;
            }}
            onScroll={this.onTopHeaderScroll}
          >
            <table
              className="table-top-header"
              onContextMenu={this.onContextMenu}
              onMouseDown={this.onMouseDown}
              onMouseOver={this.onMouseOver}
              onMouseUp={this.onMouseUp}
            >
              <thead>
                <tr>
                  {range(1, rows).map(item => (
                    <th
                      key={item}
                      data-col={item}
                      data-row={-1}
                      style={{
                        height: `${cellHeight}px`,
                        minWidth: `${minCellWidth}px`
                      }}
                      // className={
                      //   isColIncluded ? "sou-selected-cell-indicator" : ""
                      // }
                    >
                      {item > 26 &&
                        String.fromCharCode(Math.floor((item - 1) / 26) + 64)}
                      {String.fromCharCode(((item - 1) % 26) + 65)}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          <div
            className="right-bottom-wrapper"
            style={{
              // width: `calc(100% - ${39 + 1}px)`,
              width: `100%`,
              height: `${pageSize * cellHeight}px`
            }}
            ref={dom => {
              this.rightBottomWrapper = dom;
            }}
            onScroll={this.onInnerTableScroll}
          >
            <div className="right-bottom-inner-wrapper">
              <table
                className="table-content"
                ref={dom => {
                  this.tableContent = dom;
                }}
                onContextMenu={this.onContextMenu}
                onMouseDown={this.onMouseDown}
                onMouseOver={this.onMouseOver}
                onMouseUp={this.onMouseUp}
              >
                <tbody
                  onDoubleClick={() => {
                    this.showInput();
                  }}
                >
                  {this.renderCells(rows, columns, data)}
                </tbody>
              </table>

              {/* {this.renderBorders()} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactExcel.propTypes = {
  style: PropTypes.object,
  minCellWidth: PropTypes.number,
  cellHeight: PropTypes.number,
  pageSize: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onDataChange: PropTypes.func
};

ReactExcel.defaultProps = {
  data: [],
  minCellWidth: 120,
  pageSize: 20,
  cellHeight: 28,
  onDataChange: data => {
    console.log(data);
  }
};

export default ReactExcel;
