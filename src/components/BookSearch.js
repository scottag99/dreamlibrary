import React from 'react';
import { observer } from 'mobx-react';
import { Checkbox, FormControl, Input, FormGroup } from 'react-bootstrap';

export default observer(({store}) => (
  <div>
    <h3>Find Books</h3>
    <FormGroup>
      {!store.grl &&
        <div>
        <Checkbox inline value='PreK-K' checked={store.readingLevels['PreK-K']} onChange={store.handleGradeLevel}>
          PreK-K
        </Checkbox>
        <Checkbox inline value='G1-G2' checked={store.readingLevels['G1-G2']} onChange={store.handleGradeLevel}>
          G1-G2
        </Checkbox>
        <Checkbox inline value='G3-G5' checked={store.readingLevels['G3-G5']} onChange={store.handleGradeLevel}>
          G3-G5
        </Checkbox>
        </div>
      }
      <FormControl
        type="search"
        value={store.searchTerm}
        onChange={(e) => store.searchTerm = e.target.value }
      />
    </FormGroup>
  </div>
));
