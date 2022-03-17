import {
    jest,
    expect,
    describe,
    test,
    beforeEach
} from '@jest/globals'
import { Controller } from '../../../server/controller.js'
import { Service } from '../../../server/service.js'
import TestUtil from '../_util/testUtil.js'

describe('#Controller - intermediate application layer and business layer', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    
    test('getFileStream - should pass filename to service and return filestream', async () => {
        const sut = new Controller()
        const mockedStream = TestUtil.generateReadableStream(['readable'])
        const mockedType = '.html'
        
        jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name
        ).mockResolvedValue({
            stream: mockedStream,
            type: mockedType
        })
        
        const response = await sut.getFileStream('file')

        expect(response.stream).toStrictEqual(mockedStream)
        expect(Service.prototype.getFileStream).toHaveBeenCalled()

    })
})