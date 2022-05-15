import FaModel from '../../models/FaModel';

class NfaToDfaService {
  nfa: FaModel;
  constructor(nfa: FaModel) {
    this.nfa = Object.assign({}, nfa);
  }

  exec(): FaModel {
    let path: string[] = this.nfa.symbols.slice();

    let dfa: any = {};

    if (path.includes('E')) {
      dfa = this.nfaToDfaEpsilon();
    } else {
      dfa = this.nfaToDfaNonEpsilon();
    }

    return dfa;
  }

  nfaToDfaEpsilon(): FaModel {
    let nfa: any = JSON.parse(JSON.stringify(this.nfa.transitions));
    let nfa_start_state: string = this.nfa.startState;
    let nfa_end_state: string[] = this.nfa.endStates.slice();
    let path: string[] = this.nfa.symbols.slice();

    let dfa: any = {};
    let dfa_transition: any = {};
    let dfa_state: string[] = [];
    let dfa_state_test: string[] = [];
    let dfa_start_state: string = '';
    let dfa_end_state: string[] = [];
    let dfa_path: string[] = path.slice();

    //find nfa all state
    let nfa_all_transition: string[] = [];
    for (const i in nfa) {
      for (const j in nfa[i]) {
        let t = '';
        nfa[i][j].forEach(function (k, indexk) {
          t = t + k;
        });
        if (!nfa_all_transition.includes(t) && t != '') {
          nfa_all_transition.push(t);
        }
      }
    }

    // //delete epsilon symbol from dfa_path
    if (dfa_path.includes('E')) {
      dfa_path.splice(dfa_path.indexOf('E'), 1);
    }

    //find state that have epsilon path
    let epsilon_state: string[] = [];
    for (const i in nfa) {
      if (nfa[i]['E'] && nfa[i]['E'].length > 0) epsilon_state.push(i);
    }

    //find transition of epsilon_state
    let epsilon_state_transition: any = {};
    epsilon_state.forEach(function (i, iindex) {
      epsilon_state_transition[i] = {};
      epsilon_state_transition[i]['E'] = nfa[i]['E'];
    });

    //find dfa start state
    if (epsilon_state.includes(nfa_start_state)) {
      let list_tmp_state: string[] = [];
      list_tmp_state.push(nfa_start_state);

      let tmp_state: string = '';

      //test state with epsilon
      epsilon_state_transition[nfa_start_state]['E'].forEach(function (
        i,
        iindex,
      ) {
        if (!list_tmp_state.includes(i)) {
          list_tmp_state.push(i);
        }
      });

      list_tmp_state.sort();
      list_tmp_state.forEach(function (i, index) {
        tmp_state = tmp_state + i;
      });

      dfa_start_state = tmp_state;
      dfa_state_test.push(tmp_state);
    } else {
      let tmp_state: string = nfa_start_state;
      let list_tmp_state: string[] = [];
      list_tmp_state.push(nfa_start_state);
      dfa_start_state = tmp_state;
      dfa_state_test.push(tmp_state);
    }

    let testcheck = 0;
    let end_number_newstate = 1;

    //Generate dfa_state and dfa_transition
    while (dfa_state_test.length > 0) {
      let i = dfa_state_test[testcheck];
      if (!i) break;
      dfa_transition[i] = {};
      let list_tmp_state: string[] = [];
      let list_tmp_state2: string[] = [];
      let tmp_state: string = '';

      // Check each transition
      dfa_path.forEach(function (j, jindex) {
        list_tmp_state = [];
        list_tmp_state2 = [];
        tmp_state = '';
        let arry = i.split(/(..)/g).filter(s => s);
        arry.forEach(function (y, yindex) {
          if (!nfa_all_transition.includes(y)) {
            list_tmp_state.push(y);
          } else {
            Array.isArray(nfa[y][j]) &&
              nfa[y][j].forEach(function (k, kindex) {
                if (epsilon_state.includes(k)) {
                  epsilon_state_transition[k]['E'].forEach(function (
                    x,
                    xindex,
                  ) {
                    list_tmp_state.push(k);
                    list_tmp_state.push(x);
                  });
                } else list_tmp_state.push(k);
              });
          }
        });

        list_tmp_state.forEach(element => {
          if (!list_tmp_state2.includes(element)) list_tmp_state2.push(element);
        });
        list_tmp_state = [];
        list_tmp_state = list_tmp_state2;
        list_tmp_state.sort();

        let check_end_state = false;
        list_tmp_state.forEach(function (z, zindex) {
          if (nfa_end_state.includes(z)) check_end_state = true;
          tmp_state = tmp_state + z;
        });

        if (tmp_state == '' && end_number_newstate == 1) {
          tmp_state = 'a' + end_number_newstate.toString();
          end_number_newstate += 1;
        }

        if (check_end_state && !dfa_end_state.includes(tmp_state))
          dfa_end_state.push(tmp_state);
        dfa_transition[i][j] = [tmp_state];

        if (dfa_state_test.includes(tmp_state) === false && tmp_state != '')
          dfa_state_test.push(tmp_state);
      });
      dfa_state.push(i);

      testcheck += 1;
    }
    dfa_state.sort();

    // Create dfa object
    dfa = new FaModel(
      dfa_state.slice(),
      dfa_path.slice(),
      dfa_start_state.slice(),
      dfa_end_state.slice(),
      JSON.parse(JSON.stringify(dfa_transition)),
    );

    return dfa;
  }

  nfaToDfaNonEpsilon(): FaModel {
    let nfa: any = JSON.parse(JSON.stringify(this.nfa.transitions));
    let original_nfa_state: string[] = this.nfa.states.slice();
    let dfa_state: string[] = [];
    let path: string[] = this.nfa.symbols.slice();
    let nfa_end_state: string[] = this.nfa.endStates.slice();
    let dfa_end_state: string[] = this.nfa.endStates.slice();

    //get all transition from nfa
    let nfa_all_transition: string[] = [];
    for (const i in nfa) {
      for (const j in nfa[i]) {
        let t = '';
        nfa[i][j].forEach(function (k, indexk) {
          t = t + k;
        });
        if (!nfa_all_transition.includes(t) && t != '') {
          nfa_all_transition.push(t);
        }
      }
    }
    let nfa_state: string[] = [];

    original_nfa_state.forEach(function (i, iindex) {
      if (nfa_all_transition.includes(i)) {
        nfa_state.push(i);
      }
    });

    let check_null = 0;
    //generate all dfa state
    nfa_state.forEach(function (i, indexi) {
      for (const j in nfa[i]) {
        let t = '';
        let check_end_state = false;
        nfa[i][j].forEach(function (k, indexk) {
          if (nfa_end_state.includes(k)) {
            check_end_state = true;
          }
          t = t + k;
        });
        // if (check_end_state && !dfa_end_state.includes(t)) {
        //   dfa_end_state.push(t);
        // }
        if (t == '') {
          check_null = 1;
        }
        if (!dfa_state.includes(t) && t.length > 0) {
          dfa_state.push(t);
        }
      }
    });

    if (check_null == 1) {
      let t = '';
      let loop = true;
      let str = dfa_state[dfa_state.length - 1] + '1';
      let strArr: string[] = str.split(''),
        strTemp = 0;
      while (loop) {
        let str_front: string = '';
        for (let n = 0; n < strArr.length; n++) {
          if (!isNaN(Number(strArr[n]))) {
            strTemp += parseInt(strArr[n]);
          } else {
            str_front += strArr[n];
          }
        }
        t = str_front + strTemp.toString();
        if (!dfa_state.includes(t)) {
          break;
        } else {
          strArr.push('1');
        }
      }
      dfa_state.push(t);
    }

    //set transition to dfa
    let dfa_transition: any = {};
    nfa_state.forEach(function (i, indexi) {
      dfa_transition[i] = {};
      for (const j in nfa[i]) {
        let t = '';
        nfa[i][j].forEach(function (k, indexk) {
          t = t + k;
        });
        if (t == '') {
          t = dfa_state[dfa_state.length - 1];
        }
        dfa_transition[i][j] = [t];
      }
    });
    let dfa_state_n = dfa_state.filter(val => !nfa_state.includes(val));

    //set transition to new generated state
    dfa_state_n.forEach(function (i, indexi) {
      let list_tmp_state: string[] = [];
      let t: string = '';
      if (nfa_all_transition.includes(i)) {
        dfa_transition[i] = {};
        let arry = i.split(/(..)/g).filter(s => s);
        path.forEach(function (j, jindex) {
          list_tmp_state = [];
          t = '';
          arry.forEach(function (y, yindex) {
            Array.isArray(nfa[y][j]) &&
              nfa[y][j].forEach(function (k, kindex) {
                list_tmp_state.push(k);
              });
          });
          list_tmp_state.forEach(function (x, xindex) {
            t += x;
          });
          dfa_transition[i][j] = [t];
        });
      } else {
        dfa_transition[i] = {};
        path.forEach(function (j, indexj) {
          dfa_transition[i][j] = [i];
        });
      }
    });

    //checkend state
    dfa_end_state.forEach(function (i, iindex) {
      if (!dfa_state.includes(i)) {
        dfa_end_state.splice(dfa_state.indexOf(i), 1);
      }
    });

    let dfa: any = new FaModel(
      dfa_state.slice(),
      path.slice(),
      this.nfa.startState,
      dfa_end_state.slice(),
      JSON.parse(JSON.stringify(dfa_transition)),
    );

    return dfa;
  }
}

export default NfaToDfaService;
