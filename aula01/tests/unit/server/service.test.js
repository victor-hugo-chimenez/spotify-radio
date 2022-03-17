import {
    jest,
    expect,
    describe,
    test,
    beforeEach,
    beforeAll
} from '@jest/globals'
import { join } from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'
import config from '../../../server/config'
import { Service } from '../../../server/service'
import TestUtil from '../_util/testUtil'

describe('#Service - test suite for service layer', () => {
    let sut
    
    beforeAll(() => {
        sut = new Service()
    })
    
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test('getFileInfo - should return a type and name of file', async () => {

        const mockedFile = 'file.js'
        const expectedFullPath = join(config.dir.publicDirectory, mockedFile)
        const expectedFileType = '.js'

        jest.spyOn(fsPromises, fsPromises.access.name).mockReturnValue()

        const response = await sut.getFileInfo(mockedFile)

        expect(response.type).toEqual(expectedFileType)
        expect(response.name).toEqual(expectedFullPath)

    })
    test('getFileStream - should return file type and file stream', async () => {
        const mockedFile = 'file.js'
        const mockedFullPath = join(config.dir.publicDirectory, mockedFile)
        const mockedFileType = '.js'
        const mockedStream = TestUtil.generateReadableStream(['streeeeeeeeeeeam'])

        jest.spyOn(Service.prototype, Service.prototype.createFileStream.name).mockResolvedValue(mockedStream)
        jest.spyOn(Service.prototype, Service.prototype.getFileInfo.name).mockResolvedValue({
            type: mockedFileType,
            name: mockedFullPath
        })

        const response = await sut.getFileStream(mockedFile)

        expect(response.stream).resolves.toStrictEqual(mockedStream)
        expect(response.type).toEqual(mockedFileType)
    })
    test('createFileStream - should return readstream for given file', async () => {
        const mockedStream = TestUtil.generateReadableStream['streeeeeeam']
        const mockedFile = 'mock.png'

        jest.spyOn(fs, fs.createReadStream.name).mockResolvedValue(mockedStream)
        
        const response = await sut.createFileStream(mockedFile)
        
        expect(response).toStrictEqual(mockedStream)
        expect(fs.createReadStream).toHaveBeenCalled()

    })    

})