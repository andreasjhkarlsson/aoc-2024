
type Block = {
    length: number;
    id?: number;
};

type Disk = Block[];

function getLastUsedBlock(disk: Disk) {
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i].id !== undefined) return [disk[i], i] as const;
    };
}

function getFirstEmptyBlock(disk: Disk) {
    for (let i=0; i< disk.length; i++) {
        if (disk[i].id === undefined) return [disk[i], i] as const;
    }
}

function isCompact(disk: Disk) {
    let foundEmptyBlock = false;
    for (const block of disk) {
        if (block.id !== undefined && foundEmptyBlock) return false;
        foundEmptyBlock = block.id === undefined;
    }
    return true;
}

function copyDisk(disk: Disk): Disk {
    return disk.map(block => ({id: block.id, length: block.length }));
}

function compact(disk: Disk) {

    disk = copyDisk(disk);

    while (!isCompact(disk)) {

        const [lastUsedBlock, _] = getLastUsedBlock(disk);
        const [firstEmptyBlock, firstEmptyBlockLocation] = getFirstEmptyBlock(disk);

        const moveCount = Math.min(lastUsedBlock.length, firstEmptyBlock.length);

        lastUsedBlock.length -= moveCount;

        if (disk[firstEmptyBlockLocation - 1].id === lastUsedBlock.id) {
            disk[firstEmptyBlockLocation - 1].length += moveCount;
        } else {
            disk.splice(firstEmptyBlockLocation, 0, { id: lastUsedBlock.id, length: moveCount });
        }

        firstEmptyBlock.length -= moveCount;

        if (disk[disk.length - 1].id === undefined) {
            disk[disk.length - 1].length += moveCount;
        } else {
            disk.push({ length: moveCount });
        }

        compactEmptySpace(disk);
    }

    return disk;
}

function compactEmptySpace(disk: Disk) {
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i].id === undefined && i > 0 && disk[i - 1].id === undefined) {
            disk[i - 1].length += disk[i].length;
            disk.splice(i,1);
            return compactEmptySpace(disk);  
        }
        if (disk[i].length === 0) {
            disk.splice(i, 1);
            return compactEmptySpace(disk);
        }
    }
}

/**
 * A smart™ compacting algorithm that avoids fragmentation
 * @param disk 
 */
function intelliCompact(disk: Disk) {

    disk = copyDisk(disk);

    const blockIds = disk.filter(b => b.id !== undefined).map(b => b.id!);

    for (const blockId of blockIds.reverse()) {

        const blockPos = disk.findLastIndex(b => b.id === blockId);
        const blockToMove = disk[blockPos];

        for (let i = 0; i < blockPos; i++) {
            if (disk[i].id == undefined && disk[i].length >= blockToMove.length) {
                const emptyBlock = disk[i];
                emptyBlock.length -= blockToMove.length;
                disk.splice(blockPos, 1, {length: blockToMove.length});
                disk.splice(i, 0, blockToMove);
                compactEmptySpace(disk);
                break;
            }
        }
    }
    return disk;
}

function* clusters(disk: Disk) {
    let pos = 0;
    for (let i = 0; i < disk.length; i++) {
        for (let j = 0; j < disk[i].length; j++) {
            yield [pos++, disk[i].id] as const;
        }
    }
}

function checksum(disk: Disk) {
    let checksum = 0;
    for (const [ position, id ] of clusters(disk)) {
        checksum += (id ?? 0) * position;
    } 
    return checksum;
}

function readDisk(str: string) {
    return Array.from(str).reduce((blocks, char, idx) => {
        const length = parseInt(char);
        if (idx % 2 === 0) {
            blocks.push({ length, id: Math.floor(idx / 2)});
        } else if (length > 0) {
            blocks.push({length});
        }
        return blocks;
    }, [] as Disk);
}

export default function(input: string): [number, number] {

    const disk = readDisk(input);
    
    const compacted = compact(disk);  

    const smartlyCompacted = intelliCompact(disk);

    return [checksum(compacted), checksum(smartlyCompacted)];
}