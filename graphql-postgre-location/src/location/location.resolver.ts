import { Resolver, Query, Mutation, Args, Int, ResolveReference, Context } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Mutation(() => Location)
  createLocation(@Args('createLocationInput') createLocationInput: CreateLocationInput) {
    return this.locationService.create(createLocationInput);
  }

  @Query(() => [Location], { name: 'GetAllLocations' })
  findAll(@Context() context) {
    const userId = context.req.headers;
    console.log('User ID:', userId);
    return this.locationService.findAll();
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Mutation(() => Location)
  updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationInput) {
    return this.locationService.update(updateLocationInput.id, updateLocationInput);
  }

  @Mutation(() => Location)
  removeLocation(@Args('id') id: string) {
    return this.locationService.remove(id);
  }

  // this is used for federation-gateway to request the location
  @ResolveReference()
    resolvereferance(ref: { __typename: string, id: string }) {
        console.log('resolving location....')
        return this.locationService.findOne(ref.id);
    }


}
