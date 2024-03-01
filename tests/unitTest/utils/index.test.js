import {makeHttpResponse} from '#utils/index.js';

describe('makeHttpResponse should make the correct response by arguments', () => {
  describe('Success Handler', () => {
    test('When data is NOT \'undefined\' it will return WITH \'data\' property.', () => {
      const data = {ok: true};
      const message = 'ok';
      const formattedResponse = makeHttpResponse({message, data});

      expect(formattedResponse.message).toEqual(message);
      expect(formattedResponse.data).toEqual(data);
    });

    test('When data is \'undefined\' it will return WITHOUT \'data\' property.', () => {
      const data = undefined;
      const message = 'ok';
      const formattedResponse = makeHttpResponse({message, data});

      expect(formattedResponse.message).toEqual(message);
      expect(formattedResponse.data).toBeUndefined();
    });

    test('When data is \'null\' it will return WITH \'data\' property, but \'data\' is null', () => {
      const data = null;
      const message = 'ok';
      const formattedResponse = makeHttpResponse({message, data});

      expect(formattedResponse.message).toEqual(message);
      expect(formattedResponse.data).toBeNull();
    });
  });

  describe('Error Handler', () => {
    test('\'data\' isn\'t show in response when it throws the error object', () => {
      const message = 'Something went wrong';
      const formattedResponse = makeHttpResponse({message});

      expect(formattedResponse.message).toEqual(message);
      expect(formattedResponse.data).toBeUndefined();
    });
  });
});
