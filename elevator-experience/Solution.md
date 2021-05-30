#Background
```
Imagine you're working in an elevator company
and you are asked to improve the elevator experience.
Existing elevators find the shortest path to serve the passenger given a button input. 
It hasn't changed for more than 50 years.
Now with advancement in technology, 
we have cameras at every level telling us how many people are waiting,
how long each person have waited, and how many people are already in the lift.
Describe how you would design a solution to best serve the passengers.
```

# Assumptions
1. Existing elevators can find the shortest path to serve the passenger given a button input.
2. Large buildings with many floors can have many elevators.
3. For every `x` floors, there will only be `y` elevators to go around those floors and the `Ground floor`. <br>
E.g: This building has 4 elevators and 21 floors (including the `ground floor` then `1-20`).
  - `2` elevators go through floor `1-10` and the `ground floor`
  - `2` other elevators go through floor `11-20` and the `ground floor`. These elevators cannot go to floor 1-10. <br>
    
4. Elevators only go in 1 direction until they reach the end of the direction, or they are idle.
5. Each elevator can only contain `z` passengers.
6. Outside the elevators, passengers can choose their destinations before entering the elevator.
7. In the current situation, every passenger is equal to the others, means there are no VIPs or elevator for workers, etc.
8. In the current situation, every passenger who is waiting will not take the stair if they are waiting too long.
9. Cameras can detect how many people are waiting, how long each person have waited, and how many people are already in the lift.

# Solution
__We can design the elevator to run based on the priority of passengers__: For different types of building, the priority of going up or down will be various.
For example the apartment building, going down flow will be larger than going up flow in the morning,
since most of the residences will leave home to go to work in the morning. 
For different types of building, the priorities will be different, in the different part of the day, with many edge cases.
So we can only design for the most common cases.

1. __Apartment building__:
   1. __In the morning__, people prefer going down to the ground floor rather than other floors or going up.
        - __If there is only 1 elevator__:
            - __Up direction__: Try to take passenger go up fast, prefer the passengers who live on the highest floors first.
            - __Down direction__: Try to figure out the passengers, who desire to reach the ground floor, with the longest waiting time to pick up first, keep doing until full of capacity, then go straight down to the ground floor.
        - __If there are more than 1 elevator__: Try to split the available floors for each elevator like in Assumption 3. Then try to split half of the elevators to only pick up those passengers who want to go down to the ground floor.
           The other half will work as normal or work as if there is only 1 elevator as above.
   2. __In the afternoon__, people prefer going up from the ground floor rather than other floors or going down.
        - __If there is only 1 elevator__:
            - __Up direction__: Try to take as many passengers from the ground floor as possible. Then during the traversal, the elevator only pick up other passengers, who want to go up from other floors, just in case the elevator can reach those floors to drop off the current passengers.
            - __Down direction__: Try to pick passengers with the longest waiting time first.
        - __If there are more than 1 elevator__: Same with the morning, should split the amount of the elevators by half. The first half will only take passengers up. And the other half will work as normal or as there is only 1 elevator as above.
2. __Office building__: In the opposite with apartment building.
   1. __In the morning and after lunch__: People prefer going up rather than going down. Therefore, we can use the same strategy as __Apartment building__ in the afternoon.
   2. __In the afternoon and before lunch__: People prefer going down rather than going up. Therefore, we can use the same strategy as __Apartment builing__ in the morning.
    
We may improve the experience in other ways to serve the special cases:
- Adding up elevators for only using in urgent cases
- Adding up elevators for different classes or different floors
- etc...

However, between those passengers with same priority, elevators must still serve in "First come first serve" order
