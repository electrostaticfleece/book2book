import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/instructions';
import Instruction from 'components/instructions/instruction';
import FloatingCardWrap from 'components/Cards/FloatingCardWrap';
import MultiBook from 'components/MultiBook';
import Card from 'components/Cards/Card';


const cx = classNames.bind(styles);


class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1
    };
    this.getHeader = this.getHeader.bind(this);
    this.changeStage = this.changeStage.bind(this);
    this.selectBook = this.selectBook.bind(this);
  }

  stage1() {
    const { user: { trades: { potential: {requestedBook}} } } = this.props;
    const cardStyle = [{card: true, bookImg: true}, {cardBackground: true, onyx: true}];
    return (
      <Card cardStyles={{card: cardStyle[0], background: cardStyle[1]}} styles={{width: '300px'}}>
        <FloatingCardWrap 
          image={requestedBook.image} 
        />
      </Card>
    );
  }

  selectBook(book){
    const { selectBook } = this.props;
    selectBook(book);
    this.changeStage(1);
    window.scrollTo(0, 0);
  }

  stage2() {
    const { user: { books }, selectBook } = this.props;
    const dimensions = {width: 200, margin: 20};
    return (
        <MultiBook 
          books = {books}
          bookSize = 'small'
          dimensions = {dimensions}
          percentOfPage = {0.85}
          highlight = {true}
          wrap = {{click: this.selectBook, style: {accept: true, pointer: true}}}
          icons = {[{ func: () => {}, classes: {'accept-icon': true, icon: true}}]}
        />
    );
  }

  stage3() {
    const { user: { trades: { potential: {requestedBook, userBook}} } } = this.props;
    const cardStyle = [{card: true, bookImg: true}, {cardBackground: true, onyx: true}];
    return (
      <div className={cx('twoBook')}>
        <div>
          <Card cardStyles={{card: cardStyle[0], background: cardStyle[1]}} styles={{width: '300px'}}>
            <FloatingCardWrap 
              image={userBook.image} 
          />
          </Card>
          <div className={cx('bookTitle')}>
            <h2>{ userBook.title }</h2>
          </div>
        </div>
          <p className={cx('for')}>for</p>
        <div>
          <Card cardStyles={{card: cardStyle[0], background: cardStyle[1]}} styles={{width: '300px'}}>
            <FloatingCardWrap 
              image={requestedBook.image} 
            />
          </Card>
          <div className={cx('bookTitle')}>
            <h2>{ requestedBook.title }</h2>
          </div>
        </div>
      </div>
    );
  }

  changeStage(n) {
    const stage = this.state.stage;
    this.setState({stage: stage+n});
  }

  getHeader(stage) {
    const headers = [
      'Confirm the book you would like to trade for',
      'Select the book you would like to trade',
      'Submit your trade'
    ];

    return(headers[stage - 1]);
  }

  getStyles(stage){
    const styles = {content: {content: true}, stage: {stage: true}, nav: {nav: true} };
    Object.keys(styles).forEach((key) => styles[key][key + '-stage-' + stage] = true);
    return styles;
  }

  render() {
    const { state: { stage } } = this;
    const styles = this.getStyles(stage);
    const { proposeTrade } = this.props;
    return (
      <div className={cx('body')}>
        <Instruction 
          num = { stage }
          header = { this.getHeader(stage)}
        />
        <div className={cx(styles.content)}>
          <div className={cx(styles.stage)}>
            { this['stage' + stage]() }
          </div>
          <div className={cx(styles.nav)}>
            { stage > 1 ? 
                <button 
                  onClick = {() => { this.changeStage(-1); window.scrollTo(0, 0);}} 
                  className={cx('button')}
                >
                  back
                </button> : 
                null 
            }
            { stage !== 2 ?
                <button 
                  className={cx('button')} 
                  onClick = { stage < 3 ? () => { this.changeStage(1); window.scrollTo(0, 0); } : () => proposeTrade(new Date().toISOString()) }
                  >
                    { stage < 3 ? 'next' : 'submit' }
                </button> :
                null 
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;