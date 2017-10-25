import flatFiles, {FileFlattener} from '../src';

const DropzoneElement = jest.fn(() => {
  return {
    addEventListener() {
      
    }
  };
});

export interface FileSystemEntryProps {
  isDirectory: boolean;
  entries: FileSystemEntryProps[];
}

const FileSystemEntry = jest.fn((props: FileSystemEntryProps) => {
  let otherProps = {};

  if (props.isDirectory) {
    otherProps = {
      createReader() {
        return {
          readEntries: (resolver) => resolver(props.entries || [])
        }
      }
    };
  }

  return {
    ...props,
    ...otherProps
  };
});

const DataTransferItem = jest.fn(({entry}) => {
  return {
    webkitGetAsEntry: () => entry
  };
});

const DragEvent = jest.fn((items) => {
  return {
    preventDefault() {

    },
    dataTransfer: {items}
  }
});

describe.skip('#flatFiles', () => {
  test('should return the right length of files', () => {
    const onDropCallback = jest.fn();

    flatFiles(new DropzoneElement(), onDropCallback);
  });
});

describe('#FileFlattener', () => {
  it('should return an array containing all dropped files', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(new DropzoneElement(), onDropCallback);

    flattener.subscribe();

    await flattener['onDrop'](new DragEvent([
      new DataTransferItem({entry: new FileSystemEntry({name: 1})}),
      new DataTransferItem({entry: new FileSystemEntry({name: 2})})
    ]));

    expect(onDropCallback).toHaveBeenCalledWith([{
      name: 1
    }, {
      name: 2
    }]);
  });

  it('should not return directories in the result array', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(new DropzoneElement(), onDropCallback);
    
    flattener.subscribe();

    await flattener['onDrop'](new DragEvent([
      new DataTransferItem({entry: new FileSystemEntry({isDirectory: true})}),
      new DataTransferItem({entry: new FileSystemEntry({name: 1})})
    ]));

    expect(onDropCallback).toHaveBeenCalledWith([{
      name: 1
    }]);
  });

  it('should work with nested directories', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(new DropzoneElement(), onDropCallback);
    const entries = [
      new FileSystemEntry({name: 'a'})
    ];

    flattener.subscribe();

    await flattener['onDrop'](new DragEvent([
      new DataTransferItem({entry: new FileSystemEntry({isDirectory: true, entries})}),
      new DataTransferItem({entry: new FileSystemEntry({name: 'b'})})
    ]));


    expect(onDropCallback).toHaveBeenCalledWith([{
      name: 'a'
    }, {
      name: 'b'
    }]);
  });

  it.skip('webkitGetAsEntry is not supported', () => {

  });

  it.skip('no files are dropped', () => {

  });
});