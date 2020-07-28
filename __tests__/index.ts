import flatFiles, {FileFlattener} from '../src';

const createDropzone = (): any => ({
  addEventListener: jest.fn()
});

export interface FileSystemEntryProps {
  isDirectory: boolean;
  entries: FileSystemEntryProps[];
}

const createFileSystemEntry = ((props: any) => {
  let otherProps = {};

  if (props.isDirectory) {
    otherProps = {
      createReader() {
        return {
          readEntries: (resolver: Function) => resolver(props.entries || [])
        }
      }
    };
  }

  return {
    ...props,
    ...otherProps
  };
});

const createDataTransferItem = ({entry}: any) => ({
  webkitGetAsEntry: () => entry
})

const createDragEvent = (items: any): any => ({
  preventDefault() {

  },
  dataTransfer: {items}
})
describe.skip('#flatFiles', () => {
  test('should return the right length of files', () => {
    const onDropCallback = jest.fn();

    flatFiles(createDropzone(), onDropCallback);
  });
});

describe('#FileFlattener', () => {
  it('should return an array containing all dropped files', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(createDropzone(), onDropCallback);

    flattener.subscribe();
    const dragEvent = createDragEvent([
      createDataTransferItem({entry: createFileSystemEntry({name: 1})}),
      createDataTransferItem({entry: createFileSystemEntry({name: 2})})
    ]);
    await flattener['onDrop'](dragEvent);

    expect(onDropCallback).toHaveBeenCalledWith([{
      name: 1
    }, {
      name: 2
    }]);
  });

  it('should not return directories in the result array', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(createDropzone(), onDropCallback);

    flattener.subscribe();

    await flattener['onDrop'](
      createDragEvent([
        createDataTransferItem({entry: createFileSystemEntry({isDirectory: true})}),
        createDataTransferItem({entry: createFileSystemEntry({name: 1})})
      ])
    );

    expect(onDropCallback).toHaveBeenCalledWith([{
      name: 1
    }]);
  });

  it('should work with nested directories', async () => {
    const onDropCallback = jest.fn();
    const flattener = new FileFlattener(createDropzone(), onDropCallback);
    const entries = [
      createFileSystemEntry({name: 'a'})
    ];

    flattener.subscribe();

    await flattener['onDrop'](
      createDragEvent([
        createDataTransferItem({entry: createFileSystemEntry({isDirectory: true, entries})}),
        createDataTransferItem({entry: createFileSystemEntry({name: 'b'})})
      ])
    );


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