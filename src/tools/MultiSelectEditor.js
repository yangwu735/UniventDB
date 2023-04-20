import { MultiSelect } from '@syncfusion/ej2-react-dropdowns';

function MultiSelectEditor(props) {
    const { value, onChange, dataSource } = props;
  
    return (
      <MultiSelect
        mode="Box"
        dataSource={dataSource}
        value={value ? value.split(',') : []}
        change={(e) => onChange(e.value.join(','))}
      />
    );
  };

export default MultiSelectEditor;